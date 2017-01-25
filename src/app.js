const express = require('express');
const builder = require('botbuilder');

const app = express();

const port = process.env.PORT || 3000;

let sessions=[];

app.listen(port,()=>{
    console.log(`Server listening on port ${port}.`);
});

const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const bot = new builder.UniversalBot(connector);


app.post('/api/messages', connector.listen());

connector.onEvent((event)=>{
    bot.receive(event);
});

bot.on('contactRelationUpdate',(a,b,c)=>{
    console.log();
});

bot.dialog('/', function (session) {
    //let img=builder.CardImage.create(session,'https://i.imgur.com/FohY4eO.jpg');

    sessions.push(session.message.address);
    var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.markdown)
            .text('`Markdown Title`')
            .attachments([
                new builder.HeroCard(session)
                    .title('Hero Card')
                    .subtitle('Kappa.')
                    .text('text here')
                    .images([
                        builder.CardImage.create(session, 'http://i.imgur.com/MAQm02i.gif')
                    ])
                    .tap(builder.CardAction.openUrl(session, 'google.pt'))
            ]);
    session.send(msg);
/*    session.send(`Username: ${session.message.address.user.name}\n 
User Id: ${session.message.address.user.id}\n 
ChannelId: ${session.message.address.channelId}\n 
Address id: ${session.message.address.id}\n 
Conversation Id: ${session.message.address.conversation.id}`);*/
});


/*

setInterval(()=>{
    if(sessions.length>0)
        sessions.forEach((address)=>sendMessage(address));
},10000);*/

/*function sendMessage(address){
    var msg = new builder.Message()
  .text('This is a Proactive message')
  .address(address);
    bot.send(msg); 
}*/