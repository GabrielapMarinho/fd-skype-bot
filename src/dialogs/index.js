
module.exports.photoDialog = require('./photo/photoDialog');

module.exports.default = (session)=>{
    session.endDialog('Welcome! Ask a photo! Just type `Photo`');
};