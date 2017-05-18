const rngHelper = function(){
  const _getRandom= function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  };


  const _getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const _getRandomValueFromArray = function(arr){

    return arr[_getRandomInt(0,arr.length-1)];

  };

  return {
    getRandom:_getRandom,
    getRandomInt:_getRandomInt,
    getRandomValueFromArray:_getRandomValueFromArray
  };
};

module.exports = rngHelper();