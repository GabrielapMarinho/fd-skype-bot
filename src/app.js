//External dependencies
const express = require('express');
const builder = require('botbuilder');


//Dialogs
const dialogs = require('./dialogs');

//internal dependencies
const config = require('./configs/imgur');
const ImgurService = require('./services/imgur');
const imgur = new ImgurService(config);

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
    .matchesAny([/(?:^|\s)(?:photo)/i,/(?:^|\s)(?:photo)(?:\s)+([a-z_]+)/], dialogs.photoDialog(imgur))
    .onDefault(dialogs.default);

bot.dialog('/',intents);

bot.dialog('/test',(session,args)=>{
    session.endDialog(JSON.stringify(args));
});
