const ImgurService = function(httpClient){
  
  this.client = httpClient;

};

ImgurService.prototype.getSubredditGallery = function(subreddit,sort,window,page){

  const requetsUrl = buildSubredditUrl(subreddit,sort,window,page);

  return new Promise((resolve,reject)=>{
    this.client.request({
      url:requetsUrl,
      transformResponse: (data) => {
        return JSON.parse(data);
      }
    })
      .then((data)=>{
        if(!data)
          reject('No response.');
                
        return resolve(Promise.resolve(data));
      });  

  });
};


ImgurService.prototype.getRandomImageFromSubreddit = function(subreddit,sort,window,page){

  return this.getSubredditGallery(subreddit,sort,window,page)
    .then((response)=>{

      if(!response || !response.data || response.data.length === 0)
        return Promise.reject('No response data.');

      const index= getRandomInt(0,response.data.data.length-1);

      return Promise.resolve(response.data.data[index]);
    });

};
    
const getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const buildSubredditUrl = function(subreddit,sort,window,page){

  let url=`/gallery/r/${subreddit}`; 

  if(sort==='time' || sort==='top'){
    url+=`/${sort}`;
        
    if(sort==='top' && (['day','week','month','year','all'].indexOf(window)!=-1)){
      url+=`/${window}`;
    }
  }

  if(page){
    if(!isNaN( parseInt(page))){
      url+=`/${page}`;
    }

  }

  return url;
};
  


module.exports = ImgurService;