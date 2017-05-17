const SomeService = require('./SomeService');

const Installer= function(){
    
    function _install(container){

        container.register('depA',()=>{return 'A';});
        container.register('depB',()=>{return 'B';});
        container.register('service',()=> {
            return new SomeService(container.resolve('depA'),container.resolve('depB'));
        });

    }
    
    return {
        install:_install
    };
};

module.exports= Installer();