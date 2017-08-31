const ChuckNorrisService = function(httpClient){

  if(!httpClient)
    throw new Error('Invalid HttpClient.');
  this.httpClient=httpClient;

};

ChuckNorrisService.prototype.getCategories= function(){

  let requetsUrl= buildRequestUrl(false,true);

  return _request(this.httpClient,requetsUrl);
  
};

ChuckNorrisService.prototype.getJoke = function(category){

  let requetsUrl= buildRequestUrl(true,category);

  if(!requetsUrl)
    return Promise.reject('Could not build request url. Please report this error.');

  return _request(this.httpClient,requetsUrl)
    .then((data)=> Promise.resolve(data))
    .catch((err)=>{
      if(err===404)
        return Promise.reject('Category not found.');
      return Promise.reject(err);
    });

};


//Helpers==
const buildRequestUrl=function(random,category){

  let url=undefined;

  if(random===true){
    url='random';
    
    if(category)
      url+=`?category=${category}`;
  }
  else if(category){
    url='categories';
  }

  return url;
  
};

const _request = function(httpClient,url){
  return new Promise((resolve,reject)=>{
    
    httpClient.request({
      url:url,
      method:'get',
      transformResponse: (data) => {
        
        try{
          var output=JSON.parse(data);
          return output;
        }
        catch(err){
          return null;
        }
      }
    })
      .then((data)=>{

        if(!data)
          reject('No response.');
        return resolve(Promise.resolve(data));

      })
      .catch((err)=>{
        if(err && err.response && err.response.status)
          return reject(err.response.status);
        return reject(err);
      });     
    

  });
};

module.exports =ChuckNorrisService;