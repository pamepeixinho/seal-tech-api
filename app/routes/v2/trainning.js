const express = require('express');

const { recognizeByBlob } = require('../../controllers/EmotionRecognition');
const {
  upsert,
  selectAll,
  addNewEmotion,
  findAndUpdate,
} = require('../../models/trainning');

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

router.post('/upload-frame/:id', (req, res) => {
  console.log(req, res);
  const { id } = req.params;
  console.log(id);

  const { image } = req.body;

  const data = image.replace(/^data:image\/\w+;base64,/, '');
  const buf = new Buffer(data, 'base64'); // eslint-disable-line

  recognizeByBlob(buf)
    .then((prediction) => {
      console.log(prediction);
      addNewEmotion(id, prediction, (err) => {
        if (!err) {
          res.send();
        }
      });
    });
});

router.post('/answers/:id', (req, res) => {
  const { body } = req;
  const { id } = req.params;

  findAndUpdate(id, body, (err, doc) => {
    console.log('doc', doc);
    res.send(doc);
  });
});

router.get('/all', (req, res) => {
  selectAll((err, doc) => {
    console.log(doc);
    res.json(doc);
  });
});

module.exports = router;
