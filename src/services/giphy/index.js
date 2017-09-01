const querystring = require('querystring');

const Giphy = function(httpClient){
  this.client = httpClient;
};

Giphy.prototype.getRandomGif = function(tag,rated ='R'){

  const tagQuery = {tag,rated};

  return new Promise((resolve,reject)=>{
    this.client.request({
      url:`/random?${querystring.stringify(tagQuery)}`,
      
      transformResponse: (data) => {
        return JSON.parse(data);
      }
    })
      .then((data)=>{
        if(!data)
          reject('No response.');
                
        return resolve(Promise.resolve(data));
      })
      .catch((err)=>{
      
        return reject(err);
      
      });  

  });
};




module.exports = Giphy;