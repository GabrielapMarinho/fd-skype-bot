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

      session.endDialog(response.data.value);

    })
      .catch((err)=>{
        session.endDialog(`Error: ${err}`);
      });
  };

  const _defaultDialog =function(session){
    session.endDialog('Hello! To request a Chuck Norris joke, just type `chuck norris joke [category]` or `chuck norris categories` to list available categories.');
  };

  const _install = function(intents){

    intents.matchesAny([/(?:^|\s)(?:chuck norris)$/i,/(?:^|\s)(?:cn)$/i],_defaultDialog)
      .matchesAny([/(?:^|\s)(?:chuck norris categories)$/i,/(?:^|\s)(?:cnc)$/i],_getCategoriesDialog)
      .matchesAny([/(?:^|\s)(?:chuck norris joke)(?:\s)+([a-z_]+)$/i,/(?:^|\s)(?:cnj)(?:\s)+([a-z_]+)$/i,
        /(?:^|\s)(?:chuck norris joke)/i,/(?:^|\s)(?:cnj)/i],_getJokeDialog);

  };
    
  return{
    install:_install
  };


};

