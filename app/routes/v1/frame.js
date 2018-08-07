const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const { uploadToS3 } = require('../../controllers/S3.js');

router.post('/', (req, res) => {
  console.error('DEPRECATED API');
  const img = req.body.image;
  const filePath = path.join(__dirname, `../../static/frame-${new Date().getTime()}.jpg`);
  const data = img.replace(/^data:image\/\w+;base64,/, '');
  const buf = new Buffer(data, 'base64'); // eslint-disable-line
  fs.writeFile(filePath, buf, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('The file was saved!');
      uploadToS3(filePath, (prediction) => {
        res.send(prediction);
      });
    }
  });
});

module.exports = router;
