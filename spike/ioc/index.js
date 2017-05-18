const IoC = function(){
    this.container = {};
};

IoC.prototype.install = function(installer){
    installer.install(this);
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