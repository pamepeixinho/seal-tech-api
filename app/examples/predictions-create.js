const { upsert } = require('../models/prediction');

const upsert2 = () => {

  const prediction = {
    teacher: 'mr teacher',
    courses: [{
      name: 'Big Data',
      dropoutRate: 0.05,
      temporalCommitmentModules: [
        {
          module: 1,
          commitment: 10,
        },
        {
          module: 2,
          commitment: 20,
        },
        {
          module: 3,
          commitment: 90,
        },
        {
          module: 4,
          commitment: 40,
        },
        {
          module: 5,
          commitment: 80,
        },
        {
          module: 6,
          commitment: 30,
        },
      ],
      modules: [
        {
          id: 01,
          name: 'Introduction',
          meanCommitment: 0.55,
          commitmentPerStudent: [
            {
              name: 'Laurence',
              commitment: 0.8,
            },
            {
              name: 'Phillipe',
              commitment: 0.9,
            },
            {
              name: 'Dani',
              commitment: 0.1,
            },
            {
              name: 'Lele',
              commitment: 0.4,
            },
          ],
          temporalCommitment: [
            {
              week: 1,
              commitment: 0.1,
            },
            {
              week: 2,
              commitment: 0.2,
            },
            {
              week: 3,
              commitment: 0.3,
            },
            {
              week: 4,
              commitment: 0.4,
            },
          ],
          classes: [
            {
              title: 'aula maneira',
              date: '20/02/2018',
              data: { foo: 'bar' },
            },
            {
              title: 'aula maneira 2',
              date: '20/01/2017',
              data: { foo: 'bar' },
            }
          ],
        },
      ],
    }],
  };

  upsert(prediction);
};

module.exports = { upsert2 };