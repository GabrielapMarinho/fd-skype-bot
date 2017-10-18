module.exports =  (quotes)=>{
    
  const _getQuoteDialog = function(session){
    
    quotes.getRandomQuote().then((response)=>{
    
      session.endDialog(response.quote);
    
    })
      .catch((err)=>{
        session.endDialog(`Error: ${err}`);
      });
  };
    
  const _defaultDialog =function(session){
    session.endDialog('Hello! To request a quote, just type `quote`.');
  };

  const _install = function(intent){
    intent.matchesAny([/(?:^|\s)(?:quotes help)$/i],_defaultDialog)
      .matchesAny([/(?:^|\s)(?:quotes)$/i],_getQuoteDialog);
  };
 
        
  return{
    install:_install
  };
    
    
};
    
    