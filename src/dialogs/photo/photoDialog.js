const builder = require('botbuilder');
const config = require('../../configs/imgur');
const ImgurService = require('../../services/imgur');
const imgur = new ImgurService(config);

module.exports = (session,args) => {

    imgur.getRandomImageFromSubReddit('pics')
    .then((image)=>{
        
        var reply = new builder.Message(session)
      .textFormat(builder.TextFormat.markdown)
      .attachments([
          new builder.HeroCard(session)
          .title(image.title)
          .subtitle(image.link)
          .text('Take this awsome photo!')
          .images([builder.CardImage.create(session, image.link)])
          .tap(builder.CardAction.openUrl(session, image.link))
          .buttons([builder.CardAction.openUrl(session, image.link)])
      ]);

        session.endDialog(reply);

    });

};



