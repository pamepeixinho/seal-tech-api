var express = require('express');
var router = express.Router();
const { find } = require('../models/prediction');

router.get('/', (req, res, next) => {
  find('mr teacher').then((teacher) => {
    res.json(teacher[0]);
  });
});

module.exports = router;
