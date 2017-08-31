const QuotesService = function(){
 
  this.QuotesData=require('../../data/quotesData.json');
  console.log(this.QuotesData);
};

QuotesService.prototype.GetRandomQuote = function(){
  return _getRandomValueFromArray(this.QuotesData);
};

const _getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const _getRandomValueFromArray = function(arr){
  return arr[_getRandomInt(0,arr.length-1)];
};  


module.exports=QuotesService;