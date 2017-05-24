//configs
const configs = require('./configs');
const pjson = require('../package.json');

//External dependencies
const express = require('express');
const builder = require('botbuilder');
const axios = require('axios');

//internal dependencies
const ImgurService = require('./services/imgur');
const ChuckNorrisService = require('./services/chucknorris');
const rngHelper  = require('./helpers/rngHelper');

//api http clients
const imgurHttpClient = axios.create({
  baseURL: configs.imgur.baseUrl,
  timeout: configs.imgur.timeout,
  headers: {'Authorization': `Client-ID ${configs.imgur.clientID}`}
});  

const chuckNorrisHttpClient = axios.create({
  baseURL: configs.chucknorris.baseUrl,
  timeout: configs.chucknorris.timeout,
}); 

const imgur = new ImgurService(imgurHttpClient);
const chuckNorris = new ChuckNorrisService(chuckNorrisHttpClient);

//Dialogs
const dialogs = require('./dialogs')(imgur,chuckNorris,builder,configs.dialogs,rngHelper,pjson);

const port = process.env.PORT || 3000;
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
  else{
    if (message.membersAdded) {
      message.membersAdded.forEach(function (identity) {
        if (identity.id !== message.address.bot.id) {
          var reply = new builder.Message()
                            .address(message.address)
                            .text(`Hello ${identity.name}!`);
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
    //photo command
    .matchesAny([/(?:^|\s)(?:photo)/i,/(?:^|\s)(?:photo)(?:\s)+([a-z_]+)/i], dialogs.photoDialogs.photo)
    .matchesAny([/(?:^|\s)(?:photo$)/i], dialogs.photoDialogs.default)
    //chuck norris command
    .matchesAny([/(?:^|\s)(?:chuck norris)$/i,/(?:^|\s)(?:cn)$/i],dialogs.chuckNorrisDialogs.default)
    .matchesAny([/(?:^|\s)(?:chuck norris categories)$/i,/(?:^|\s)(?:cnc)$/i],dialogs.chuckNorrisDialogs.categories)
    .matchesAny([/(?:^|\s)(?:chuck norris joke)(?:\s)+([a-z_]+)$/i,/(?:^|\s)(?:cnj)(?:\s)+([a-z_]+)$/i,
      /(?:^|\s)(?:chuck norris joke)/i,/(?:^|\s)(?:cnj)/i],dialogs.chuckNorrisDialogs.joke)
    //debug command
    .matchesAny([/(?:^|\s)(?:debug)/i],dialogs.debugDialogs.debug)
    .matches(/(?:^|\s)(?:debug)(?:\s)+(?:clear)/i,dialogs.debugDialogs.clearData)
    //help command
    .matchesAny([/(?:^|\s)(?:help)/i],dialogs.help.help)
    .onDefault(dialogs.default);

bot.dialog('/',intents);

