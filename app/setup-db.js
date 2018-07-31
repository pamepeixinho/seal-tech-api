const mongoose = require('mongoose');
const config = require('./config');

const connect = () => {
	console.log('Mongo: connecting to: ' + config.MONGODB_URI);

	console.log(config);
	mongoose.connect(config.MONGODB_URI);

	mongoose.connection.on('error',
		console.error.bind(console, 'mongo connection error'));
}

module.exports = { connect };



