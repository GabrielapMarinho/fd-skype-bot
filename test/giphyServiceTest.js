const GiphyService = require('../src/services/giphy');


describe('#Giphy Serice Test.',()=>{

  const httpClientToPass = {
    request:()=>{
      return new Promise((resolve)=>{
        resolve({data:{data:['stub data']}});
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


  it('Random Gif request.',(done)=>{

    const imgur = new GiphyService(httpClientToPass);

    imgur.getRandomGif('test')
      .then((data)=>{
        if(data)
          done(); 
      });

  });

  it('No Gif Data.',(done)=>{

    const imgur = new GiphyService(httpClientToFail);

    imgur.getRandomGif('test')
      .then((data)=>{
         
        done(data); 
      })
      .catch(()=>{
        done();
      });

  });

    
});