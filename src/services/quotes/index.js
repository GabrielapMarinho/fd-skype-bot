const QuotesService = function(){
 
  this.QuotesData = require('../../data/quotesData.json');
};

QuotesService.prototype.getRandomQuote = function(){
  return new Promise((resolve,reject)=>{

    const quote = _getRandomValueFromArray(this.QuotesData);

    if(quote)
      return resolve(quote);
    else
      return reject(); 
  }); 
};

const _getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const _getRandomValueFromArray = function(arr){
  return arr[_getRandomInt(0,arr.length-1)];
};  


module.exports=QuotesService;