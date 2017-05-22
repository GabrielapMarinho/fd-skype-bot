const axios = require('axios');
const ChuckNorrisService = require('../src/services/chucknorris');

const httpClient = axios.create({
  baseURL: 'https://api.chucknorris.io/jokes/',
  timeout: 5000
});  

const service = new ChuckNorrisService(httpClient);

service.getCategories()
.then((data)=>{
  console.log(data.data);
});

service.getJoke('dev')
.then((data)=>{
  console.log(data.data);
});