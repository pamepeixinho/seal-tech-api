const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const FrameSchema = new Schema({
  id: ObjectId,
  sessionId: String,
  imageUrl: String,
  videoTimestamp: Number,
});

var Frame = mongoose.model('Frame', FrameSchema);

const find = (id) => {
	return Frame.find({ id })
    .lean()
    .exec()
    .then((frames) => {
      return frames[0];
    });
}

const findBySession = (sessionId = '007') => {
  return Frame.find({ "sessionId": sessionId })
    .lean()
    .exec()
    .then((frames) => frames);
}

const upsert = (doc) => {
	var frame = new Frame(doc);
	var obj = frame.toObject();

	return frame.validate()
    .then(function() {
      return Frame
        .findOneAndUpdate({ id: obj._id }, obj, { upsert: true, new: true })
        .lean()
        .exec();
    });
}
module.exports = { find, findBySession, upsert };