const express = require('express');

const router = express.Router();
const { find } = require('../../models/prediction');

router.get('/', (req, res) => {
  find('mr teacher').then((teacher) => {
    res.json(teacher[0]);
  });
});

module.exports = router;
