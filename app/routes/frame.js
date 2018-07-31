const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { uploadToS3 } = require('../controllers/S3.js');

router.post('/', function(req, res) {
  var img = req.body.image;
  const filePath = path.join(__dirname, '../static/frame-'+ new Date().getTime() +'.jpg');
  var data = img.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer(data, 'base64');
  fs.writeFile(filePath, buf, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
        uploadToS3(filePath, (prediction) => {
          res.send(prediction);
        });
    }
  });
});

module.exports = router;
   