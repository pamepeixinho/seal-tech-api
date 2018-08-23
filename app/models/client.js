const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const ClientSchema = new Schema({
  id: ObjectId,
  name: String,
  courses: [{
    id: String,
    name: String,
    password: String,
  }],
});

const Client = mongoose.model('Client', ClientSchema);

const selectAll = (callback) => {
  const fields = Object.keys(ClientSchema.paths).join(' ');

  // and when execute a query
  Client.find({}).select(fields).exec(callback);
};

const selectAllWithoutPassword = (callback) => {
  Client.find({}).select({ 'courses.password': 0 }).exec(callback);
};

const find = id => Client.find({ id })
  .lean()
  .exec()
  .then(client => client);

const insertMany = (clients, callback) => Client.insertMany(clients, callback);

const upsert = ({ name, courses }, callback) => {
  const client = new Client({ name, courses });
  const obj = client.toObject();

  return Client
    .findOneAndUpdate({ id: obj._id }, obj, { upsert: true, new: true }) // eslint-disable-line
    .lean()
    .exec(callback);
};

const addNewCourse = (clientName, course, callback) => Client
  .findOneAndUpdate({ name: clientName }, { $push: { course } })
  .lean()
  .exec(callback);

const findAndUpdate = (id, data, callback) => Client
  .findByIdAndUpdate(id, data)
  .lean()
  .exec(callback);

module.exports = {
  find, upsert, insertMany, selectAll, addNewCourse, findAndUpdate, selectAllWithoutPassword,
};
