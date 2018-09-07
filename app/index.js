const express = require('express');

const app = express();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const { connect } = require('./setup-db');

// TODO: Better handle versions.

const finish = require('./routes/finish');
const client = require('./routes/client');
const showcase = require('./routes/showcase');

// V1
const frame = require('./routes/v1/frame');
const trainning = require('./routes/v1/trainning');
const dashboard = require('./routes/v1/dashboard');

// V2
const frameV2 = require('./routes/v2/frame');
const trainningV2 = require('./routes/v2/trainning');
const dashboardV2 = require('./routes/v2/dashboard');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.use(fileUpload());
app.use(bodyParser({ limit: '50mb' }));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/dashboard', dashboard);
app.use('/finish', finish);
app.use('/client', client);
app.use('/showcase', showcase);

app.use('/frame', frame);
app.use('/trainning', trainning);

app.use('/v2/frame', frameV2);
app.use('/v2/trainning', trainningV2);
app.use('/v2/dashboard', dashboardV2);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`SealTech API listening on ${port}`);
});

// Database
connect();
