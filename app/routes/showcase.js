const express = require('express');

const { recognizeByBlob } = require('../controllers/EmotionRecognition');
const { commitmentByEmotions } = require('../controllers/commitment');

const router = express.Router();

router.post('/frame', (req, res) => {
  const { image } = req.body;

  const data = image.replace(/^data:image\/\w+;base64,/, '');
  const buf = new Buffer(data, 'base64'); // eslint-disable-line

  recognizeByBlob(buf)
    .then((prediction) => {
      console.log(prediction);
      commitmentByEmotions(prediction).then(({ commitment }) => {
        console.log(commitment);
        res.send({ ...prediction, commitment });
      });
    });
});

module.exports = router;
