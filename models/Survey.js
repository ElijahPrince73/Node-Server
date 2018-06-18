const mongoose = require('mongoose');
const {
  Schema
} = mongoose

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  // This tells mongoose that the recipients will be an array containing strings
  recipients: [String]
})

mongoose.model('surveys', surveySchema)