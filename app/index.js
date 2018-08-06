var express = require('express');
var app = express();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const { connect } = require('./setup-db');

var dashboard = require('./routes/dashboard');
var frame = require('./routes/frame');
var finish = require('./routes/finish');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Images
app.use(fileUpload());
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/dashboard', dashboard);
app.use('/frame', frame);
app.use('/finish', finish);

const port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log(`FocaAi API listening on ${port}`);
});

// Database
connect();