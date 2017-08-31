module.exports =  (imgur,builder,configs,rngHelper)=>{

  const _photoDialog = function(session,args){

        
    const subreddit = (args.matched && args.matched.length>1) 
      ? args.matched[1] 
      : rngHelper.getRandomValueFromArray(configs.defaultSubreddits);


    _updateStats(session,subreddit);

    imgur.getRandomImageFromSubreddit(subreddit)
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
    
  const _default = function(session) {
    session.endDialog('Type `Photo` or `Photo [subreddit]` to get a random photo.');
  };

  return{
    photo:_photoDialog,
    default:_default
  };


};


const _updateStats = function(session,subreddit){
  if(session.message && session.message.user)
    session.userData.userName = session.message.user.name || 'John Doe';
        
  if(!session.userData.stats)
    session.userData.stats={};

  if( !session.userData.stats[subreddit] )
    session.userData.stats[subreddit] =1;
  else
    session.userData.stats[subreddit] ++; 
};