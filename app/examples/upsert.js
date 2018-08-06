const { upsert } = require('../models/frame');

const upsert2 = () => {
  upsert({
    imageUrl: 'foo/image.jpg',
    videoTimestamp: 12.2,
  });
};

module.exports = { upsert2 };
