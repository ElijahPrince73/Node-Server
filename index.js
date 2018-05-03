const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI).then(
	() => {
		console.log('CONNECTED TO DATABASE');
	},
	err => {
		console.log(err);
	}
);

const app = express()

require('./routes/auth-routes')(app);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`);
})