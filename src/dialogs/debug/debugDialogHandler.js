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

  return  {
    debug:_debugDialog,
    clearData:_clearDataDialog

  };

};