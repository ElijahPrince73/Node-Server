const mongoose = require('mongoose');
const {
  Schema
} = mongoose
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  // This tells mongoose that the recipients will be a subdocument with an
  // array of recipients
  recipients: [RecipientSchema],
  yes: {
    type: Number,
    default: 0
  },
  no: {
    type: Number,
    default: 0
  }
})

mongoose.model('surveys', surveySchema)