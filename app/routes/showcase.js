const express = require('express');

const { recognizeByBlob } = require('../controllers/EmotionRecognition');
const { commitmentByEmotions } = require('../controllers/commitment');

const router = express.Router();

router.post('/frame', (req, res) => {
  const { image } = req.body;

  const imgdata = image.replace(/^data:image\/\w+;base64,/, '');
  const buf = new Buffer(imgdata, 'base64'); // eslint-disable-line

  recognizeByBlob(buf)
    .then((prediction) => {
      console.log(prediction);
      commitmentByEmotions(prediction).then(({ data }) => {
        res.send({ ...prediction, commitment: data.commitment });
      });
    });
});

module.exports = router;
