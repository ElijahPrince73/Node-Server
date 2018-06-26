const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const Survey = mongoose.model('surveys');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const {
      title,
      body,
      subject,
      recipients
    } = req.body

    const survey = new Survey({
      title,
      body,
      subject,
      // returns the email address in an object
      recipients: recipients.split(',').map((email) => ({
        email: email.trim()
      })),
      _user: req.user.id,
      dateSent: Date.now(),
    })
    // Sends email
    const mailer = new Mailer(survey, surveyTemplate(survey))
    mailer.send().then((value) => {
      console.log(value);
    }).catch((err) => {
      console.log('ERROR:', JSON.stringify(err, undefined, 2));
    })
  })
}