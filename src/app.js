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
    //let img=builder.CardImage.create(session,'https://i.imgur.com/FohY4eO.jpg');

    var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.markdown)
            .text('`Markdown Title`')
            .attachments([
                new builder.HeroCard(session)
                    .title('Hero Card')
                    .subtitle('Kappa.')
                    .text('Some text here kappa.')
                    .images([
                        builder.CardImage.create(session, 'https://i.ytimg.com/vi/8kBurd4ce0A/maxresdefault.jpg')
                    ])
                    .tap(builder.CardAction.openUrl(session, 'https://i.ytimg.com/vi/8kBurd4ce0A/maxresdefault.jpg'))
            ]);
    session.send(msg);
});