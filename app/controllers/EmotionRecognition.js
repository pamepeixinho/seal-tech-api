const axios = require('axios');
const config = require('../config');

const getEmotionRecognition = imgUrl => axios({
  method: 'post',
  url: config.EMOTIONS_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': config.EMOTIONS_API_KEY,
  },
  data: {
    url: imgUrl,
  },
}).then(emotions => emotions.data[0].scores).catch((error) => {
  console.error(error);
});

module.exports = { getEmotionRecognition };
