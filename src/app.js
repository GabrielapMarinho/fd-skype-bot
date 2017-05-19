//configs
const imgurConfigs = require('./configs/imgur');
const dialogConfigs = require('./configs/dialogs');
const pjson = require('../package.json');

//External dependencies
const express = require('express');
const builder = require('botbuilder');
const axios = require('axios');
const httpClient = axios.create({
  baseURL: imgurConfigs.baseUrl,
  timeout: imgurConfigs.timeout,
  headers: {'Authorization': `Client-ID ${imgurConfigs.clientID}`}
});  

//internal dependencies
const ImgurService = require('./services/imgur');
const rngHelper  = require('./helpers/rngHelper');
const imgur = new ImgurService(httpClient);
const port = process.env.PORT || 3000;


//Dialogs
const dialogs = require('./dialogs')(imgur,builder,dialogConfigs,rngHelper,pjson);

const app = express();
app.listen(port,()=>{
  console.log(`Server listening on port ${port}.`);
});

const connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const bot = new builder.UniversalBot(connector);

app.post('/api/messages', connector.listen());

//=================================

bot.on('conversationUpdate', function (message) {
   // Check for group conversations
  if (message.address.conversation.isGroup) {
        // Send a hello message when bot is added
    if (message.membersAdded) {
      message.membersAdded.forEach(function (identity) {
        if (identity.id === message.address.bot.id) {
          var reply = new builder.Message()
                            .address(message.address)
                            .text('Hello everyone!');
          bot.send(reply);
        }
      });
    }

        // Send a goodbye message when bot is removed
    if (message.membersRemoved) {
      message.membersRemoved.forEach(function (identity) {
        if (identity.id === message.address.bot.id) {
          var reply = new builder.Message()
                        .address(message.address)
                        .text('Goodbye');
          bot.send(reply);
        }
      });
    }
  }
});

bot.on('contactRelationUpdate', function (message) {
  if (message.action === 'add') {
    var name = message.user ? message.user.name : null;
    var reply = new builder.Message()
                .address(message.address)
                .text('Hello %s! Thanks for adding me.', name || 'there');
    bot.send(reply);
  } else {
        //TODO:s delete their data
  }
});

bot.on('deleteUserData', function (message) {
  console.log(message);
    // TODO: User asked to delete their data
});

//======

/*
    default intentThreshold is 0.1
    on group chat the match score is < 0.1 so i had to tweak it to pass the intent match.
    score = matched.length / context.message.text.length; botbuilder v3.5.4
 */
let intents = new builder
    .IntentDialog({ intentThreshold: 0.01 })
    .matchesAny([/(?:^|\s)(?:photo)/i,/(?:^|\s)(?:photo)(?:\s)+([a-z_]+)/], dialogs.photoDialogs.photo)
    .matchesAny([/(?:^|\s)(?:debug)/i],dialogs.debugDialogs.debug)
    .matches(/(?:^|\s)(?:debug)(?:\s)+(?:clear)/,dialogs.debugDialogs.clearData)
    .onDefault(dialogs.default);

bot.dialog('/',intents);

