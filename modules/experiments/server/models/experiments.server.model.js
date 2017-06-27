'use strict';

/**  
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Experiment Schema
 */

var experimentSchema = new Schema({
  created_at: Date,
  updated_at: Date,
  participants: [ { type: Schema.Types.ObjectId, ref: 'Participant' } ], //Allows you to save references
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  appointments: [ { type: Schema.Types.ObjectId, ref: 'Appointment' } ],
  display_name : String,
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  requires_eyeglasses: {
    type: Boolean,
    required: true,
    default: false
  },
  // insert hook to check uniqueness (cant make nested objects unique apparently), otherwise up to the admin to be correct with naming.
  experiment_name: {
    type: String,
    required: true
  },  
  experiment_conditions: [String]
  
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
experimentSchema.pre('save', function(next) {
  var currentTime = new Date();
  var fields = 
  this.updated_at = currentTime;
  if(!this.created_at){
    this.created_at = currentTime;
  }
  if(!this.users){
    this.users = [];
    console.log('users empty');
  }
  if(!this.participants){
    this.participants = [];
  }
  if(!this.appointments){
    this.appointments = [];
  }
  
  
  var temp = this.experiment_name;
  if(this.experiment_conditions)
  {
    for(var i = 0; i < this.experiment_conditions.length; i++)
    {
      temp = temp + ' ' + this.experiment_conditions[i];
    }
    
  }
  
  this.display_name = temp;
  
  
  next();
});
var Experiment = mongoose.model('Experiment', experimentSchema);
module.exports = Experiment;