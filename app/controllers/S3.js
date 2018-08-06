const AWS = require('aws-sdk');

const config = require('../config');
const { upsert } = require('../models/frame');
const { getEmotionRecognition } = require('../controllers/EmotionRecognition');


AWS.config.update({ region: 'us-west-2' });
const bucket = 'the-greate-bucket-of-gondor';

const s3 = new AWS.S3({
  apiVersion: config.AWS_API_VERSION,
  accessKeyId: config.AWS_KEY,
  secretAccessKey: config.AWS_SECRET_KEY,
});

const uploadParams = {
  Bucket: bucket,
  Key: '',
  Body: '',
  ACL: 'public-read',
};
const sessionId = '007';
const videoTimeStamp = 12.0;

const uploadToS3 = (filePath, cb) => {
  const fs = require('fs'); // eslint-disable-line
  const fileStream = fs.createReadStream(filePath);
  fileStream.on('error', (err) => {
    console.log('File Error', err);
  });
  uploadParams.Body = fileStream;

  const path = require('path'); // eslint-disable-line
  uploadParams.Key = path.basename(filePath);

  // call S3 to retrieve upload file to specified bucket
  s3.upload(uploadParams, (err, data) => {
    if (err) {
      console.log('Error', err);
    }
    if (data) {
      console.log('Upload Success', data.Location);
      upsert({
        sessionId,
        imageUrl: data.Location,
        videoTimeStamp,
      });

      getEmotionRecognition(data.Location)
        .then((data) => { // eslint-disable-line
          cb(data);
        }).catch((error) => { throw new Error(error); });
    }
  });
};

module.exports = {
  uploadToS3,
};
