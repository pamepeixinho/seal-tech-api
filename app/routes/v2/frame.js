const express = require('express');

const router = express.Router();
const { recognizeByBlob } = require('../../controllers/EmotionRecognition');
const { upsert } = require('../../models/frame');

const sessionId = '007';
const videoTimeStamp = 12.0;

router.post('/', (req, res) => {
  const img = req.body.image;
  const data = img.replace(/^data:image\/\w+;base64,/, '');
  const buf = Buffer.from(data, 'base64');

  recognizeByBlob(buf)
    .then((prediction) => {
      upsert({
        sessionId,
        imageUrl: data.Location,
        videoTimeStamp,
      });

      return res.send(prediction);
    }).catch(error => res.status(500).send(error));
});

module.exports = router;
