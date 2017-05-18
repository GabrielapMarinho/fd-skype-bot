
const photoDialog = require('./photo/photoDialog');

const defaultDialog = function(session){
    session.endDialog('Hello! To request a photo, just type `photo` or `photo category`.');
};

module.exports = function(imgur,builder,configs,rngHelper){

    return{
        photoDialog:photoDialog(imgur,builder,configs,rngHelper),
        default:defaultDialog

    };

};