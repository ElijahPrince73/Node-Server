const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
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
		const events = req.body.map(({ email, url }) => {
			const pathname = new URL(url).pathname;
			const p = new Path('/api/surveys/:surveyId/:choice');
			const match = p.test(pathname);
			if (match) {
				return {
					email,
					surveyId: match.surveyId,
					choice: match.choice
				};
			}
		});
		// Removes any undefined
		const compactEvents = _.compact(events);
		// Makes sure that each one is unique
		const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
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
