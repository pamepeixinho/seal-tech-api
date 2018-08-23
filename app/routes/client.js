const express = require('express');

const {
  selectAllWithoutPassword,
  insertMany,
} = require('../models/client');

const router = express.Router();

/**
 * /add
 *
 * Receives initial user class data, saves in mongo
 * and, then, returns the id for client
 *
 * body: {
 *  clients: [{
 *    name: String,
 *    courses: []
 *  }]
 * }
 *
 * returns:
 *  - ok
 */
router.post('/add', (req, res) => {
  const { body } = req;
  const { clients } = body;
  console.log(clients);

  insertMany(clients, (err, doc) => {
    console.log('doc', doc);
    if (!err) {
      res.status(200).send();
      return;
    }

    res.status(200).send();
  });
});

router.get('/all', (req, res) => {
  selectAllWithoutPassword((err, doc) => {
    console.log(doc);
    res.json(doc);
  });
});

module.exports = router;
