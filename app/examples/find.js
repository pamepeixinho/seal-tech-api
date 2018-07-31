const ObjectID = require('mongodb').ObjectID;
const { find } = require('./models/frame');

find(ObjectID("5b5cdb593d745540ae4542b9"))
  .then((output) => console.log(output));
