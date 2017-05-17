const IoC = require('./ioc');
const Installer =require('./installer');

let container= new IoC();

Installer.install(container);

console.log(container);


const moduleTest=container.resolve('service');

console.log(moduleTest);