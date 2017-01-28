const builder = require('botbuilder');

  

const getRandomSubRedditFromConfigs = function(){
    
};

module.exports =  (imgur)=>{
    
    return  (session,args) => {

        const subreddit= (args.matched && args.matched.length>1) ? args.matched[1] :'pics';

        imgur.getRandomImageFromSubReddit(subreddit)
          .then((image)=>{
        
              const reply = new builder.Message(session)
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

          })
          .catch(()=>{session.endDialog('Sorry could not find a photo from that category.');});

    };

};
