const ImgurService = require('../src/services/imgur');


describe('#Imgur Serice Test.',()=>{

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


  it('Subreddit image gallery request.',(done)=>{

    const imgur = new ImgurService(httpClientToPass);

    imgur.getSubredditGallery('pics')
      .then((data)=>{
        if(data)
          done(); 
      });

  });

  it('Subreddit random image from gallery.',(done)=>{

    const imgur = new ImgurService(httpClientToPass);

    imgur.getRandomImageFromSubreddit('pics')
      .then((data)=>{
        if(data)
          done(); 
      });

  });

  it('No data from gallery.',(done)=>{

    const imgur = new ImgurService(httpClientToFail);

    imgur.getRandomImageFromSubreddit('pics')
      .then((data)=>{
         
        done(data); 
      })
      .catch(()=>{
        done();
      });

  });

    
});