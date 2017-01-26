const express = require('express');
const builder = require('botbuilder');
const app = express();

const port = process.env.PORT || 3000;

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
        
        // delete their data
    }
});

bot.on('deleteUserData', function (message) {
    // User asked to delete their data
});

//======

bot.endConversationAction('goodbye', 'Goodbye :)', { matches: /^goodbye/i });

bot.beginDialogAction('photo','/photo',{ matches:/photo/i});

bot.dialog('/photo',(session)=>{
    
    var reply= new builder.Message(session)
    .attachments([
        new builder.HeroCard(session)
            .title('Awsome photo!')
            .text('Take this awsome photo!')
            .images([builder.CardImage.create(session,'http://wallpaper-gallery.net/images/awesome-images/awesome-images-16.jpg')])
            .tap(builder.CardAction.openUrl(session, 'http://google.pt'))
    ]);

    session.send(reply);

});

bot.dialog('/', (session)=>{
    session.send('Welcome! Ask a photo! Just type `Photo`');
}); 
