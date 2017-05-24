//external dependencies
const assert = require('chai').assert;

//internal dependencies
const ChuckNorrisService = require('../src/services/chucknorris');

describe('#Chuck Norris Service Test (Chuck norris is testing the bot ofc...)',()=>{

  const httpClientToPass = {
    request:()=>{
      return new Promise((resolve)=>{
        resolve({msg:'stub data'});
      });
    }
  };

  const httpClientToFail = {
    request:()=>{
      return new Promise((resolve)=>{
        resolve();
      });
    }
  };

  const httpClientToFail404 = {
    request:()=>{
      return new Promise((resolve,reject)=>{
        reject(404);
      });
    }
  };

  const httpClientJsonParseTestOK = {
    request:(options)=>{
      return new Promise((resolve)=>{
        let output=options.transformResponse('{"msg":"test"}'); 
        resolve(output);
      });
    }
  }; 

  const httpClientJsonParseTestFail = {
    request:(options)=>{
      return new Promise((resolve)=>{
        let output=options.transformResponse('12312:asdas:AD.ASd"asd123'); 
        resolve(output);
      });
    }
  }; 

  const httpClientToFailRandomError = {
    request:()=>{
      return new Promise((resolve,reject)=>{
        reject(new Error('Random error.'));
      });
    }
  };

  it('Should throw error when httpClient is undefiened',()=>{
    assert.throw(()=>{ new ChuckNorrisService(undefined);});
  }); 

  it('Should return an Chuck Norris Service instance when valid input is passed.',()=>{
    let chuckNorris = new ChuckNorrisService(httpClientToPass);
    assert.instanceOf(chuckNorris,ChuckNorrisService);
  });

  it('Should return categories data when request is done with success',(done)=>{

    const chuckNorris = new ChuckNorrisService(httpClientToPass);
    chuckNorris.getCategories()
      .then((data)=>{

        assert.isNotNull(data);
        done();

      }).catch((err)=>{
        
        done(err);
        
      });

  });

  it('Should return a joke data from given category when request is done with success.',(done)=>{

    const chuckNorris = new ChuckNorrisService(httpClientToPass);
    chuckNorris.getJoke('category')
      .then((data)=>{

        assert.isNotNull(data);
        done();

      }).catch((err)=>{
        
        done(err);
        
      });

  });

  it('Should return a random joke data when request is done with success without a category.',(done)=>{

    const chuckNorris = new ChuckNorrisService(httpClientToPass);
    chuckNorris.getJoke()
      .then((data)=>{

        assert.isNotNull(data);
        done();

      }).catch((err)=>{
        
        done(err);
        
      });

  }); 

  it('Should reject promise with a 404 when category is not found.',(done)=>{

    const chuckNorris = new ChuckNorrisService(httpClientToFail404);
    chuckNorris.getJoke('dev')
      .then((data)=>{
        done(`Error! should reject promise but got ${data}`);
      }).catch((err)=>{
        assert(err=='Category not found.');
        done();
      });

  }); 

  it('Should reject promise with error when request returns an error.',(done)=>{

    const chuckNorris = new ChuckNorrisService(httpClientToFailRandomError);
    chuckNorris.getJoke('dev')
      .then((data)=>{
        done(`Error! should reject promise but got ${data}`);
      }).catch((err)=>{
        assert.instanceOf(err,Error);
        done();
      });

  }); 


  it('Should reject promise when request response doesnt contain data',(done)=>{

    const chuckNorris = new ChuckNorrisService(httpClientToFail);
    chuckNorris.getCategories()
      .then((data)=>{
        done(`Error! should reject promise but got ${data}`);
      }).catch(()=>{
        done();
      });

  });

  it('Should return valid json when httpClient receives valid data.',(done)=>{

    const chuckNorris = new ChuckNorrisService(httpClientJsonParseTestOK);
    chuckNorris.getCategories()
      .then((data)=>{
        assert.isDefined(data);
        done();
      }).catch((err)=>{
        done(err);
      });

  });

  it('Should fail to parse to json when httpClient receives invalid data.',(done)=>{

    const chuckNorris = new ChuckNorrisService(httpClientJsonParseTestFail);
    chuckNorris.getCategories()
      .then((data)=>{
        done(data);
      }).catch(()=>{
        done();
      });

  });

 

});

