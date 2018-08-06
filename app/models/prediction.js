const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const PredictionSchema = new Schema({
  id: ObjectId,
  teacher: String,
  courses: [{
    name: String,
    dropoutRate: Number,
    commitmentRate: Number,
    modules: [{
      id: Number,
      name: String,
      meanCommitment: Number,
      commitmentPerStudent: [{
        name: String,
        commitment: Number,
      }],
      temoporalCommitment: [{
        week: Number,
        commitment: Number,
      }],
      temporalCommitmentModules: [{
        module: Number,
        commitment: Number,
      }],
      classes: [{
        tittle: String,
        commitment: Number,
        date: String,
      }],
    }],
  }],
});

const Prediction = mongoose.model('Prediction', PredictionSchema);

const find = teacher => Prediction.find({ teacher })
  .lean()
  .exec()
  .then(predictions => predictions);

const upsert = (doc) => {
  const prediction = new Prediction(doc);
  const obj = prediction.toObject();

  return prediction.validate()
    .then(() => Prediction
      .findOneAndUpdate({ id: obj._id }, obj, { upsert: true, new: true }) // eslint-disable-line
      .lean()
      .exec());
};
module.exports = { find, upsert };
