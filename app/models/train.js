const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const TrainSchema = new Schema({
  id: ObjectId,
  name: String,
  classLink: String,
  emotions: [{
    anger: Number,
    contempt: Number,
    disgust: Number,
    fear: Number,
    happiness: Number,
    neutral: Number,
    sadness: Number,
    surprise: Number,
  }],
  grade: Number,
});

const Train = mongoose.model('Train', TrainSchema);

const selectAll = (callback) => {
  const fields = Object.keys(TrainSchema.paths).join(' ');

  // and when execute a query
  Train.find({}).select(fields).exec(callback);
};

const find = id => Train.find({ id })
  .lean()
  .exec()
  .then(emotions => emotions);

const upsert = (doc, callback) => {
  const train = new Train(doc);
  const obj = train.toObject();
  console.log('obj', obj);

  return Train
    .findOneAndUpdate({ id: obj._id }, obj, { upsert: true, new: true }) // eslint-disable-line
    .lean()
    .exec(callback);
};

module.exports = { find, upsert, selectAll };
