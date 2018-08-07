const express = require('express');

const app = express();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const { connect } = require('./setup-db');

// TODO: Better handle versions.

// V1
const dashboard = require('./routes/v1/dashboard');
const frame = require('./routes/v1/frame');
const finish = require('./routes/v1/finish');
const trainning = require('./routes/v1/trainning');

// V2
const frameV2 = require('./routes/v2/frame');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Images
app.use(fileUpload());
app.use(bodyParser({ limit: '50mb' }));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/dashboard', dashboard);
app.use('/frame', frame);
app.use('/finish', finish);
app.use('/trainning', trainning);

app.use('/v2/frame', frameV2);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`FocaAi API listening on ${port}`);
});

// Database
connect();
