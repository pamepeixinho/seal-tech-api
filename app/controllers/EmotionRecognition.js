const axios = require('axios');
const config = require('../config');

const buildRequest = (contentType, body) => ({
  method: 'post',
  url: config.EMOTIONS_API_URL,
  headers: {
    'Content-Type': `${contentType}`,
    'Ocp-Apim-Subscription-Key': config.EMOTIONS_API_KEY,
  },
  data: body,
});

const parseResponse = response => response.data[0].scores;

const recognizeByUrl = imgUrl => axios(buildRequest('application/json', { url: imgUrl }))
  .then(parseResponse)
  .catch(error => error);

const recognizeByBlob = img => axios(buildRequest('application/octet-stream', img))
  .then(parseResponse)
  .catch(error => error);

module.exports = { recognizeByUrl, recognizeByBlob };
