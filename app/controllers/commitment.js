const axios = require('axios');
const config = require('../config');

const buildQueryStrings = obj => Object.keys(obj)
  .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
  .join('&');

const buildRequest = (emotions) => {
  const url = `${config.CLASSIFICATOR_API_URL}/predict?${buildQueryStrings(emotions)}`;
  console.log(url);
  return ({
    method: 'get',
    url,
  });
};

const commitmentByEmotions = emotions => axios(buildRequest(emotions));

module.exports = { commitmentByEmotions };
