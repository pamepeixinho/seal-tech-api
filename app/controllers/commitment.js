const axios = require('axios');
const config = require('../config');

const buildQueryStrings = obj => Object.keys(obj)
  .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
  .join('&');

const buildRequest = emotions => ({
  method: 'get',
  url: `${config.CLASSIFICATOR_API_URL}/predict?${buildQueryStrings(emotions)}`,
});

const commitmentByEmotions = emotions => axios(buildRequest(emotions))
  .then((commiment) => {
    console.log(commiment);
    return commiment;
  })
  .catch(error => error);

module.exports = { commitmentByEmotions };
