const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI).then(
	() => {
		console.log();
	},
	err => {
		console.log(err);
	}
);

const app = express()

// Extreact cookie data
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
)

// in order to use cookie sessions we need to start it
app.use(passport.initialize())
// creates persistent login sessions
app.use(passport.session())

require('./routes/auth-routes')(app);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`);
})