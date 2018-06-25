const sendGrid = require('sendgrid');
const helper = sendGrid.mail

const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({
    subject,
    recipients
  }, content) {
    super();

    this.from_email = new helper.Email('no-reply@emaily.com')
    this.subject = subject
    this.body = new helper.Content('text/html', content)
    this.recipients = this.formatAddresses(recipients)
    console.log(this.recipients);

    this.addContent(this.body)
    this.addClickTracking()
    this.addRecipients()
  }
  //
  formatAddresses(recipients) {
    return recipients.map(({
      email
    }) => {
      return new helper.Email(email)
    })
  }


  // Not sure here
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings()
    const clickTracking = new helper.ClickTracking(true, true)

    trackingSettings.setClickTacking(clickTracking)
    this.addTrackingSettings(trackingSettings)
  }

  addRecipients() {
    const personalize = new helper.Personalize()

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient)
    })
    this.addPersonalize(personalize)
  }
}

module.exports = Mailer