
module.exports.photoDialog = require('./photo/photoDialog');

module.exports.default = (session)=>{
    session.endDialog('Hello! To request a photo, just type `photo` or `photo category`.');
};