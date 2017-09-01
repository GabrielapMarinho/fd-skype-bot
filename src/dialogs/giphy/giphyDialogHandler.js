module.exports = (giphy,builder)=>{

  const _defaultDialog = function(session){
    session.endDialog('Hello! To request a Gif, just type `Gif [category]`');
  };

  const _getRandomGifDialog = async function(session,args){

    const tag = args.matched[1] || null;

    try{
      
      const response = await giphy.getRandomGif(tag);

      const reply = new builder.Message(session)
        .textFormat(builder.TextFormat.markdown)
        .attachments([
          new builder.HeroCard(session)
          //.title(image.title)
          //.subtitle(image.link)
            .text('Take this awsome GIF!')
            .images([builder.CardImage.create(session, response.data.data.image_url)])
            .tap(builder.CardAction.openUrl(session, response.data.data.image_url))
            .buttons([builder.CardAction.openUrl(session, response.data.data.image_url)])
        ]);

      session.endDialog(reply);

    }catch(err){
      session.endDialog(`Error: ${err}`);
    }

  };

  return {
    default:_defaultDialog,
    randomGif:_getRandomGifDialog
  };
};