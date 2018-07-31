const express = require('express');
const router = express.Router();
const { findBySession } = require('../models/frame');
const { getEmotionRecognition } = require('../controllers/EmotionRecognition');
const { upsert } = require('../models/prediction');
const ObjectID = require('mongodb').ObjectID;

const aritimethicAverage = (arr) =>
  arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

const calculateAverage = (frames) => {

  let engagementSum = 0;
  const prediction = {
    _id: ObjectID("5b5cdb593d745540ae4542b9"),
    teacher: 'mr teacher',
    courses: [{
      dropoutRate: 0.05,
      commitmentRate: 0,
      modules: [{
        id: 01,
        name: 'introducao',
        meanCommitment: 0.4,
        commitmentPerStudent: [],
        temoporalCommitment: [],
        classes: [],
      }]
    }],
  };

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  frames.map( async (frame, index) => {
    
    // Calulate average commitment;
    averageCommitment = await getEmotionRecognition(frame.imageUrl)
      .then((data) => {
        if (data) {
          const values = Object.values(data);
          const average = aritimethicAverage(values);
          return average * 1.9;
        }

      }).catch((error) => {});

    if (averageCommitment) {
        const randonIndex = getRandomArbitrary(0, 4).toFixed(0) ;
      
        /**
         * We did not have students base so for the purpose of displaying
         * The graphics, we are randominzing the data.
         */
        const randonIndexName = getRandomArbitrary(0, 7).toFixed(0) ;
        const nameArray = ['pedro', 'paulo', 'ricardo', 'jonas', 'marcos', 'geovani', 'peter', 'joao'];
        const y = averageCommitment * getRandomArbitrary(0, 1);
        prediction.courses[0].modules[0].commitmentPerStudent.push({
          name: nameArray[randonIndexName],
          commitment: y.toFixed(2),
        });

        // Add commitment per student
        const weeks = [1, 2, 3, 4, 5];
        const x = averageCommitment * getRandomArbitrary(0, 1);
        prediction.courses[0].modules[0].temoporalCommitment.push({
          week: weeks[randonIndex],
          commitment: x.toFixed(2),
        });

        // Classes
        const classes = ['algorítimos', 'introdução', 'na prática', 'pré-ferido', 'off'];
        prediction.courses[0].modules[0].classes.push({
          tittle: classes[randonIndex],
          commitment: averageCommitment * getRandomArbitrary(0, 1),
          date: new Date().toISOString(),
        });

        // engagementSum = engagementSum + averageCommitment;  
        prediction.courses[0].commitmentRate = averageCommitment * 1.2;
        upsert(prediction);
    }

  })
};

router.post('/', (req, res) => {
  findBySession().then((frames) => {
    calculateAverage(frames);
  });
});
  
module.exports = router;
   