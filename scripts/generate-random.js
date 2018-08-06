const fs = require('fs');
const path = require('path');

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const generateRandomPayload = () => ({
  engagement: getRandomArbitrary(0, 1).toFixed(1),
  anger: getRandomArbitrary(0, 15),
  contempt: getRandomArbitrary(0, 15),
  disgust: getRandomArbitrary(0, 15),
  fear: getRandomArbitrary(0, 15),
  happiness: getRandomArbitrary(0, 15),
  neutral: getRandomArbitrary(0, 15),
  sadness: getRandomArbitrary(0, 15),
  surprise: getRandomArbitrary(0, 15),
});


const obj = [];
for (let i = 0; i < 10000; i += 1) {
  obj.push(generateRandomPayload());
}

const json = JSON.stringify(obj);

const outputPath = path.join(__dirname, 'output.json');
fs.writeFile(outputPath, json, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }

  return console.log('The file was saved!');
});
