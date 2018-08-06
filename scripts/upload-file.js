// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: 'us-west-2' });

// Create S3 service object
const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: 'AKIAJLWFAUTBJCUXTEBQ',
  secretAccessKey: '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',
});

// call S3 to retrieve upload file to specified bucket
const uploadParams = { Bucket: process.argv[2], Key: '', Body: '' };
const file = process.argv[3];

const fs = require('fs');

const fileStream = fs.createReadStream(file);
fileStream.on('error', (err) => {
  console.log('File Error', err);
});
uploadParams.Body = fileStream;

const path = require('path');

uploadParams.Key = path.basename(file);

// call S3 to retrieve upload file to specified bucket
s3.upload(uploadParams, (err, data) => {
  if (err) {
    console.log('Error', err);
  } if (data) {
    console.log('Upload Success', data.Location);
  }
});
