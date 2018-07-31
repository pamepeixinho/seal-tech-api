var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});

// Create the parameters for calling createBucket
var bucketParams = {
   Bucket : 'the-greate-bucket-of-gondor'
};            

// Create S3 service object
s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: 'AKIAJLWFAUTBJCUXTEBQ',
	secretAccessKey: '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'
});
                                   
// Call S3 to create the bucket
s3.createBucket(bucketParams, function(err, data) {
   if (err) {
      console.log("Error", err);
   } else {
      console.log("Success", data.Location);
   }
});