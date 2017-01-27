const axios = require('axios');

const ImgurService = function(config){
  
    this.client = axios.create({
        baseURL: config.baseUrl,
        timeout: config.timeout,
        headers: {'Authorization': `Client-ID ${config.clientID}`}
    });  

};

ImgurService.prototype.getSubredditGallery = function(subReddit){
    return new Promise((resolve,reject)=>{
        this.client.request({
            url:`/gallery/r/${subReddit}`,
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


ImgurService.prototype.getRandomImageFromSubReddit = function(subReddit){

    return this.getSubredditGallery(subReddit)
    .then((response)=>{

        if(!response || !response.data)
            return Promise.reject('No response data.');

        const index= getRandomInt(0,response.data.data.length);

        return Promise.resolve(response.data.data[index]);
    });

};
    
const getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
  

module.exports = ImgurService;