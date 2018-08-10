const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const Survey = mongoose.model('surveys');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = app => {
	app.get('/api/surveys/thanks', (req, res) => {
		res.send('Thanks for voting');
	});

	app.post('/api/surveys/webhooks', (req, res) => {
		console.log(req.body);
		res.send({});
	});
	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, body, subject, recipients } = req.body;

		const survey = new Survey({
			title,
			body,
			subject,
			// returns the email address in an object
			recipients: recipients.split(',').map(email => ({
				email: email.trim()
			})),
			_user: req.user.id,
			dateSent: Date.now()
		});
		// Sends email
		const mailer = new Mailer(survey, surveyTemplate(survey));
		try {
			await mailer.send();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();
			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
