
const IoC = function(){
    this.container = {};

   /* this.container.resolve=function(dependency){
        return this.container[dependency];
    };*/
};

IoC.prototype.install = function(installer){
    installer.install(this.container);
};

IoC.prototype.register = function (name,impl){
    this.container[name] = impl;
};

IoC.prototype.resolve=function(module){
    let dep=this.container[module] ;
    if(!dep) throw  Error('Could not find dependency');
    return dep(); 
};

module.exports = IoC;