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

bot.dialog('/', function (session) {

    var msg = new builder.Message(session)
            .attachments([{
                contentType: 'image/gif',
                contentUrl: 'http://i.imgur.com/MAQm02i.gif'
            }]); 

    session.send(msg);

});
