const express = require('express');

const app = express();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const { connect } = require('./setup-db');

const dashboard = require('./routes/dashboard');
const frame = require('./routes/frame');
const finish = require('./routes/finish');
const train = require('./routes/train');
// const { upsert2 } = require('./examples/predictions-create');

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
app.use('/train', train);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`FocaAi API listening on ${port}`);
});

// Database
connect();
