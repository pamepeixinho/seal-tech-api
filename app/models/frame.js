const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const FrameSchema = new Schema({
  id: ObjectId,
  sessionId: String,
  imageUrl: String,
  videoTimestamp: Number,
});

const Frame = mongoose.model('Frame', FrameSchema);

const find = id => Frame.find({ id })
  .lean()
  .exec()
  .then(frames => frames[0]);

const findBySession = (sessionId = '007') => Frame.find({ sessionId })
  .lean()
  .exec()
  .then(frames => frames);

const upsert = (doc) => {
  const frame = new Frame(doc);
  const obj = frame.toObject();

  return frame.validate()
    .then(() => Frame
      .findOneAndUpdate({ id: obj._id }, obj, { upsert: true, new: true }) // eslint-disable-line
      .lean()
      .exec());
};
module.exports = { find, findBySession, upsert };
