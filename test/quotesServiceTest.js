//external dependencies
const assert = require('chai').assert;

const QuotesService =require('../src/services/quotes');

describe('#Quotes Serice Test.',()=>{
  it('Should load quotes data from file',(done)=>{
  
    const quotesService= new QuotesService();
    quotesService.getRandomQuote()
      .then((quote)=>{
        assert.isDefined(quote);
        assert.isObject(quote);
        done();
      })
      .catch((err)=>done(err)); 

  });
});