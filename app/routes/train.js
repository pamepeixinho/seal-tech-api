const express = require('express');

const { upsert, selectAll } = require('../models/train');

const router = express.Router();

/**
 * /initial-data
 *
 * Receives initial user class data, saves in mongo
 * and, then, returns the id for client
 *
 * body:
 *  - name
 *  - classLink
 * returns:
 *  - id (object id in mongo)
 */
router.post('/initial-data', (req, res) => {
  const { body } = req;
  const { name, classLink } = body;
  console.log(name, classLink);

  upsert({ name, classLink }, (err, doc) => {
    console.log('doc', doc);
    if (!err) {
      res.json({ id: doc.id });
    }

    res.end();
  });
});

router.post('/upload-emotion', (req, res) => {
  console.log(req, res);
});

router.post('/answers', (req, res) => {
  console.log(req, res);
});

router.get('/all', (req, res) => {
  selectAll((err, doc) => {
    console.log(doc);
    res.json(doc);
  });
});

module.exports = router;
