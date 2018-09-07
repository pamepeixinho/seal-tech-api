const axios = require('axios');
const config = require('../config');

const buildQueryStrings = obj => Object.keys(obj)
  .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
  .join('&');

// const buildRequest = (emotions) => {
//   console.log('TESTEEEEEE');
//   const url = `${config.CLASSIFICATOR_API_URL}/predict?${buildQueryStrings(emotions)}`;
//   console.log(url);
//   return ({
//     method: 'get',
//     url,
//   });
// };

const commitmentByEmotions = (emotions) => {
  const url = `${config.CLASSIFICATOR_API_URL}/predict?${buildQueryStrings(emotions)}`; 
  console.log('Will request classification: ');
  console.log(url);
  console.log('===============================');
  return axios.get(url);
};

// const commitmentByEmotions = (emotions) => Promise.resolve({ data: { commitment: 0.1836734693877551 } }); //eslint-disable-line


module.exports = { commitmentByEmotions };
