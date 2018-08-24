const express = require('express');

const { recognizeByBlob } = require('../controllers/EmotionRecognition');

const router = express.Router();

router.post('/frame', (req, res) => {
  console.log(req, res);
  const { id } = req.params;
  console.log(id);

  const { image } = req.body;

  const data = image.replace(/^data:image\/\w+;base64,/, '');
  const buf = new Buffer(data, 'base64'); // eslint-disable-line

  recognizeByBlob(buf)
    .then((prediction) => {
      console.log(prediction);
      res.send(prediction);
    });
});

module.exports = router;
