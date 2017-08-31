//external dependencies
const assert = require('chai').assert;

const QuotesService =require('../src/services/quotes');


it('Should load quotes data from file',(done)=>{
  
  const quotesService= new QuotesService();
  let quote = quotesService.GetRandomQuote(); 
  
  assert.isDefined(quote);
  assert.isObject(quote);
  done();

});