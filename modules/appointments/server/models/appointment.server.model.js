'use strict';

//Dependencies
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//Schema
var appointmentSchema = new Schema({
  participant: { type: Schema.Types.ObjectId, ref: 'Participant' },
  experiment: { type: Schema.Types.ObjectId, ref: 'Experiment' },
  created_at: Date,
  updated_at: Date,
  duration: {
    type: Number,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  location: String,
  email_sent: {
    type: Boolean,
    default: false
  },
  tags: [String],
  prettyDate: String,
  comments: String
});

//Set created/updated time on saves
appointmentSchema.pre('save', function (next) {
  var currentTime = new Date();
  this.updated_at = currentTime;
  if (!this.created_at) {
    this.created_at = currentTime;
  }
  this.prettyDate = this.time.toLocaleString();
  next();
});


var Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
