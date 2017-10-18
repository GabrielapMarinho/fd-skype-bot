module.exports =  (pjson)=>{
    
  const _debugDialog = function(session){
    session.userData.name=session.message.user.name;
        
    session.endDialog(`-Bot version ${pjson.version}.
        - Username: ${session.message.user.name}.
        - UserId: ${session.message.user.id}.
        - Requests Stats: ${JSON.stringify(session.userData.stats)}.`);
  };

  const _clearDataDialog = function(session) {
    session.userData=null;
    session.endDialog('User data cleared.');
  };

  const _install = function (intents){
    intents.matchesAny([/(?:^|\s)(?:debug)/i],_debugDialog)
      .matches(/(?:^|\s)(?:debug)(?:\s)+(?:clear)/i,_clearDataDialog);
  };
  return  {

    install:_install

  };

};