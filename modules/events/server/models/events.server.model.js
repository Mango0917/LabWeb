'use strict';

//Dependencies
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//Schema
var eventSchema = new Schema({
  image: String,
  description: String,
  title: String,
  created_at: Date,
  updated_at: Date
});

//Set created/updated time on saves
eventSchema.pre('save', function (next) {
  var currentTime = new Date();
  this.updated_at = currentTime;
  if (!this.created_at) {
    this.created_at = currentTime;
  }
  next();
});


var Event_t = mongoose.model('Event_t', eventSchema);

module.exports = Event_t;
