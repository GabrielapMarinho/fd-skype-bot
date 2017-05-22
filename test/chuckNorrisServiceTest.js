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


  it('Should reject promise when request is done with error',(done)=>{

    const chuckNorris = new ChuckNorrisService(httpClientToFail);
    chuckNorris.getCategories()
      .then((data)=>{
        done(`Error! should reject promise but got ${data}`);
      }).catch(()=>{
        done();
      });

  });

});

