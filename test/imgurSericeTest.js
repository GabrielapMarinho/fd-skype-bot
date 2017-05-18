const ImgurService = require('../src/services/imgur');
const imgurConfigs = require('../src/configs/imgur');
const axios = require('axios');
const httpClient = axios.create({
  baseURL: imgurConfigs.baseUrl,
  timeout: imgurConfigs.timeout,
  headers: {'Authorization': `Client-ID ${imgurConfigs.clientID}`}
});  
const imgur = new ImgurService(httpClient);

describe('#Imgur Serice Test.',()=>{

  it('Subreddit image gallery request.',(done)=>{
    imgur.getSubredditGallery('pics')
        .then((data)=>{
          if(data)
            done(); 
        });

  });

  it('Subreddit random image from gallery.',(done)=>{
    imgur.getRandomImageFromSubreddit('pics')
        .then((data)=>{
          if(data)
            done(); 
        });

  });

    
});