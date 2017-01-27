const rngHelper = function(){
    const _getRandom= function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    };


    const _getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    return {
        getRandom:_getRandom,
        getRandomInt:_getRandomInt
    };
};

module.exports = rngHelper();