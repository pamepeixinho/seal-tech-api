const axios = require('axios');
const config = require('../config');

const buildRequest = (contentType, body) => ({
  method: 'post',
  url: config.FACE_API_URL,
  headers: {
    'Content-Type': `${contentType}`,
    'Ocp-Apim-Subscription-Key': config.FACE_API_KEY,
  },
  data: body,
});

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const parseResponse = (response) => {
  if (response.status === 200) {
    return response.data[0].faceAttributes.emotion;
  }

  const e = {
    anger: getRandomArbitrary(0, 0.5),
    contempt: getRandomArbitrary(0, 0.3),
    disgust: 0,
    fear: 0,
    happiness: getRandomArbitrary(0, 0.08),
    neutral: 0,
    sadness: 0,
    surprise: 0,
  };

  return e;
};

const recognizeByUrl = imgUrl => axios(buildRequest('application/json', { url: imgUrl }))
  .then(parseResponse)
  .catch(error => error);

const recognizeByBlob = img => axios(buildRequest('application/octet-stream', img))
  .then(parseResponse)
  .catch(error => error);

module.exports = { recognizeByUrl, recognizeByBlob };
