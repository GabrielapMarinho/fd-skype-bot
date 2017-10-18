
const DialogsInstaller = function(intents,handlers){
  this.intents=intents;
  this.handlers=handlers;
};

DialogsInstaller.prototype.Install = function(){
  this.handlers.map((handler)=>handler.install(this.intents));

};

module.exports = DialogsInstaller;