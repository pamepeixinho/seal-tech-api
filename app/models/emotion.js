const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

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

const Emotion = mongoose.model('Emotion', EmotionSchema);

const find = id => Emotion.find({ id })
  .lean()
  .exec()
  .then(emotions => emotions[0]);

const upsert = (doc) => {
  const emotion = new Emotion(doc);
  const obj = emotion.toObject();

	return emotion.validate()
    .then(function() {
      return Emotion
        .findOneAndUpdate({ id: obj._id }, obj, { upsert: true, new: true })
        .lean()
        .exec();
    });
}

module.exports = { find, upsert };