const config = require('../config');
const { upsert } = require('../models/frame');
const { getEmotionRecognition } = require('../controllers/EmotionRecognition');

var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
const bucket = 'the-greate-bucket-of-gondor';

s3 = new AWS.S3({
  apiVersion: config.AWS_API_VERSION,
  accessKeyId: config.AWS_KEY,
	secretAccessKey: config.AWS_SECRET_KEY
});

var uploadParams = {
  Bucket: bucket,
  Key: "",
  Body: "",
  ACL: "public-read"
};
const sessionId = '007';
const videoTimeStamp = 12.0;

const uploadToS3 = (filePath, cb) => {
  var fs = require("fs");
  var fileStream = fs.createReadStream(filePath);
  fileStream.on("error", function(err) {
    console.log("File Error", err);
  });
  uploadParams.Body = fileStream;
  
  var path = require("path");
  uploadParams.Key = path.basename(filePath);
  
  // call S3 to retrieve upload file to specified bucket
  s3.upload(uploadParams, function(err, data) {
    if (err) {
      console.log("Error", err);
    }
    if (data) {
      console.log("Upload Success", data.Location);
      upsert({
        sessionId,
        imageUrl: data.Location,
        videoTimeStamp
      });

      getEmotionRecognition(data.Location)
        .then((data) => {
          cb(data);
        }).catch((error) => {throw new Error(error)});
    }
  });
};

module.exports = {
  uploadToS3
};

