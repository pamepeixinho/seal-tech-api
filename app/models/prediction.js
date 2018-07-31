const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
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
  }]
});

var Prediction = mongoose.model('Prediction', PredictionSchema);

const find = (teacher) => {
	return Prediction.find({ teacher })
    .lean()
    .exec()
    .then((predictions) => {
      return predictions;
    });
}

const upsert = (doc) => {
	var prediction = new Prediction(doc);
	var obj = prediction.toObject();

	return prediction.validate()
    .then(function() {
      return Prediction
        .findOneAndUpdate({ id: obj._id }, obj, { upsert: true, new: true })
        .lean()
        .exec();
    });
}
module.exports = { find, upsert };