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


bot.dialog('/',(session)=>{

   
    var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachments([
                new builder.HeroCard(session)
                    .title('Hero Card')
                    .subtitle('Space Needle')
                    .text('The <b>Space Needle</b> is an observation tower in Seattle, Washington, a landmark of the Pacific Northwest, and an icon of Seattle.')
                    .images([
                        builder.CardImage.create(session, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Seattlenighttimequeenanne.jpg/320px-Seattlenighttimequeenanne.jpg')
                    ])
                    .tap(builder.CardAction.openUrl(session, 'https://en.wikipedia.org/wiki/Space_Needle'))
            ]);
    session.send(msg);
}); 
