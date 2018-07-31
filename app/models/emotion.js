const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const EmotionSchema = new Schema({
  id: ObjectId,
  anger: Number,
  contempt: Number,
  disgust: Number,
  fear: Number,
  happiness: Number,
  neutral: Number,
  sadness: Number,
  surprise: Number,
});

var Emotion = mongoose.model('Emotion', EmotionSchema);

const find = (id) => {
	return Emotion.find({ id })
    .lean()
    .exec()
    .then((emotions) => {
      return emotion[0];
    });
}

const upsert = (doc) => {
	var emotion = new Emotion(doc);
	var obj = emotion.toObject();

	return emotion.validate()
    .then(function() {
      return Emotion
        .findOneAndUpdate({ id: obj._id }, obj, { upsert: true, new: true })
        .lean()
        .exec();
    });
}
module.exports = { find, upsert };