'use strict';

/**  
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Publication Schema
 */

var PublicationSchema = new Schema({
  
  title: { type: String, required: true },
  created: {
    type: Date,
    default: Date.now()
  },
  
  information: {
    type: String,
    required: true },
      
    
  tags: [String],
    
  url: {
    type: String,
    default: ''
  }
});


/* 'pre' function that adds the updated_at (and created_at if not already there) property */
PublicationSchema.pre('save', function(next) {
  var currentTime = new Date();
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  
  
  next();
});

var Publication = mongoose.model('Publication', PublicationSchema);
module.exports = Publication;