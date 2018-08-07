const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const TrainningSchema = new Schema({
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
  interesting: Number,
  previousKnowledge: Number,
  attention: Number,
  longVideo: Number,
  tooMuchContent: Number,
  noPause: Number,
  moreDynamic: Number,
  likeDidactics: Number,
  goodExamples: Number,
  goodExperience: Number,
  haveCommitment: Number,
  continueVideosLikeThis: Number,
  recommendVideo: Number,
});

const Trainning = mongoose.model('Trainning', TrainningSchema);

const selectAll = (callback) => {
  const fields = Object.keys(TrainningSchema.paths).join(' ');

  // and when execute a query
  Trainning.find({}).select(fields).exec(callback);
};

const find = id => Trainning.find({ id })
  .lean()
  .exec()
  .then(emotions => emotions);

const upsert = (doc, callback) => {
  const trainning = new Trainning(doc);
  const obj = trainning.toObject();
  console.log('obj', obj);

  return Trainning
    .findOneAndUpdate({ id: obj._id }, obj, { upsert: true, new: true }) // eslint-disable-line
    .lean()
    .exec(callback);
};

const addNewEmotion = (id, emotions, callback) => {
  console.log(emotions);
  return Trainning
    .findByIdAndUpdate(id, { $push: { emotions } })
    .lean()
    .exec(callback);
};

const findAndUpdate = (id, data, callback) => {
  console.log(id, data);
  return Trainning
    .findByIdAndUpdate(id, data)
    .lean()
    .exec(callback);
};

module.exports = {
  find, upsert, selectAll, addNewEmotion, findAndUpdate,
};
