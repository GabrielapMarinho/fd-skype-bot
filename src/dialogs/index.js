//Importing handlers
const PhotoDialogHandler = require('./photo/photoDialogHandler');
const DebugDialogHandler = require('./debug/debugDialogHandler');
const ChuckNorrisDialogHandler = require('./chucknorris/chuckNorrisDialogHandler');

const defaultDialog = function(session){
  session.endDialog('Hello! Type `help` to get more info about available commands.');
};

module.exports = function(imgur,chuckNorris,builder,configs,rngHelper,pjson){
  
  //Initializing handlers with needed dependencies
  const photoDialogHandler = PhotoDialogHandler(imgur,builder,configs,rngHelper);
  const debugDialogHandler = DebugDialogHandler(pjson);
  const chuckNorrisDialogHandler = ChuckNorrisDialogHandler(chuckNorris,builder);

  return{
    photoDialogs:{
      photo:photoDialogHandler.photo,
      default:photoDialogHandler.default
    },
    debugDialogs:{
      debug:debugDialogHandler.debug,
      clearData:debugDialogHandler.clearData
    },
    chuckNorrisDialogs:{
      categories:chuckNorrisDialogHandler.categories,
      joke:chuckNorrisDialogHandler.joke,
      default:chuckNorrisDialogHandler.default
    },
    default:defaultDialog

  };

};