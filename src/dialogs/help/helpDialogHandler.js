module.exports =  ()=>{

  const _default = function(session) {
    session.endDialog('### Commands:\n* `Photo` - Random photos api.\n* `Chuck Norris` - Random Chuck Norris jokes api.');
  };

  const _install = function(intents){
    intents.matchesAny([/(?:^|\s)(?:help)/i],_default);
  };

  return  {
    install:_install

  };

};