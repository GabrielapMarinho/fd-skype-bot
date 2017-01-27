const ImgurService = require('../src/services/imgur');

const config = require('../src/configs/imgur');
const imgur = new ImgurService(config);

describe('#Imgur Serice Test.',()=>{

    it('Subreddit image gallery request.',(done)=>{
        imgur.getSubredditGallery('pics')
        .then((data)=>{
            if(data)
                done(); 
        });

    });

    it('Subreddit random image from gallery.',(done)=>{
        imgur.getRandomImageFromSubReddit('pics')
        .then((data)=>{
            if(data)
                done(); 
        });

    });

    
});