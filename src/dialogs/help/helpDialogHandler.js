module.exports =  ()=>{

  const _default = function(session) {
    session.endDialog('### Commands:\n* `Photo` - Random photos api.\n* `Chuck Norris` - Random Chuck Norris jokes api.');
  };

  return  {
    default:_default,

  };

};