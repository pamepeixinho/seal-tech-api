var nconf = require('nconf');
nconf.argv().env();

module.exports = {
  MONGODB_URI: nconf.get('MONGODB_URI') || 'mongodb+srv://fullstarks:lXtpVzww2mUpJqeZ@cluster0-qvogc.mongodb.net/fullstarks?retryWrites=true',
  EMOTIONS_API_URL: nconf.get('MSURL') || 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
  EMOTIONS_API_KEY: nconf.get('EMOTIONS_API_KEY') || 'f78ee79976c145a597e68a63d4307fc3',
  AWS_API_VERSION: nconf.get('AWS_API_VERSION') || '2006-03-01',
  AWS_KEY: nconf.get('AWS_KEY') || 'AKIAJLWFAUTBJCUXTEBQ',
  AWS_SECRET_KEY: nconf.get('AWS_SECRET_KEY') || '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',
};
