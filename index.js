const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI).then(
  () => {
    console.log('CONNECTED');
  },
  err => {
    console.log(err);
  }
);

const app = express()

app.use(bodyParser.json())

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
require('./routes/billingRoutes')(app);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
})