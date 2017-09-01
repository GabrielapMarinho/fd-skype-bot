module.exports =  (chuckNorris,builder)=>{

  const _getCategoriesDialog = function(session){


    chuckNorris.getCategories()
      .then((response)=>{
 
        const categories=response.data.map((c)=>`* ${c}\n`).join('');
        const reply = new builder.Message(session)
          .textFormat(builder.TextFormat.markdown).text(`### Categories that can handle Chuck Norris:\n\n${categories}`);

        session.endDialog(reply);

      })
      .catch((err)=>{session.endDialog(`Error: ${err}`);});


  };

  const _getJokeDialog = function(session,args){

    const category = args.matched[1] || null;

    chuckNorris.getJoke(category).then((response)=>{
 
      /*const subtite = response.data.category ? response.data.category.map((c)=>`#${c}`).join(' ') : '#random';
      const reply = new builder.Message(session)
                    .textFormat(builder.TextFormat.markdown)
                         .attachments([
                           new builder.HeroCard(session)
                          .title('Chuck Norris!')
                          .subtitle(subtite)
                          .text(response.data.value)
                          .images([builder.CardImage.create(session, 'http://cdn.business2community.com/wp-content/uploads/2016/03/Vd3MJo.jpg')])
                          
                         ]);
                    */

      session.endDialog(response.data.value);

    })
      .catch((err)=>{
        session.endDialog(`Error: ${err}`);
      });
  };

  const _defaultDialog =function(session){
    session.endDialog('Hello! To request a Chuck Norris joke, just type `chuck norris joke [category]` or `chuck norris categories` to list available categories.');
  };
    
  return{
    categories:_getCategoriesDialog,
    joke: _getJokeDialog,
    default:_defaultDialog
  };


};

