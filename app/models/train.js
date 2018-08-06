const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const TrainSchema = new Schema({
  id: ObjectId,
  classes: [{
    name: String,
    link: Number,
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
  }]
});

var Train = mongoose.model('Train', TrainSchema);

const find = (id) => {
	return Emotion.find({ id })
    .lean()
    .exec()
    .then((emotions) => emotions);
}

const upsert = (doc) => {
	var train = new Train(doc);
	var obj = train.toObject();

	return train.validate()
    .then(function() {
      return train
        .findOneAndUpdate({ id: obj._id }, obj, { upsert: true, new: true })
        .lean()
        .exec();
    });
}

module.exports = { find, upsert };
