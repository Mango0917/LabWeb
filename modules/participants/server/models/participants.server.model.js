'use strict';

/**  
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Participant Schema
 */

var ParticipantSchema = new Schema({
  
  created_at: {
    type: Date,
    default: Date.now
  },
  
  updated_at: {
    type: Date,
    default: Date.now
  },
  
  name: {
    type: String,
    required: true,
    unique: true
  },

  phone_number:{
    type: Number
  },

    //email is not being stored and then retrieved.+
  email: {  // add validator in this
    type: String,
    default: '',
    unique: true,
    required: 'Email must be specified!'
  },

  gender: String,
  card_info: String,

  lastPaid: Date,

  dob: Date,
  subject_id: Number,
  vision_test: Boolean,
  corrective_lenses: Boolean,
  contact_lenses: Boolean,
  took_audiogram: Boolean,
  HRTF_assigned: String,
  tags: [String],
  gift_cards: [String],
  appointments:     [ { type: Schema.Types.ObjectId, ref: 'Appointment' } ],
  experiments:      [{ type: Schema.Types.ObjectId, ref: 'Experiment' }],
  comment: String

});



/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
ParticipantSchema.pre('save', function(next) {
  var currentTime = new Date();
  this.updated_at = currentTime;
  if(!this.created_at){
    this.created_at = currentTime;
  }
  if(!this.experiments){
    this.experiments = [];
  }
  if(!this.appointments){
    this.appointments = [];
  }
  //var dob_str = new Date(Date.UTC(this.dob.year, , day, 0, 0, 0)); testing this.
  
  
  next();
});

var Participant = mongoose.model('Participant', ParticipantSchema);
module.exports = Participant;

