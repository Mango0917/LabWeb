'use strict';

//Dependencies
var path = require('path'),
  mongoose = require('mongoose'),
  Event_t = require('../models/events.server.model.js'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  multer = require('multer'),
  config = require(path.resolve('./config/config'));

//Create event
exports.create = function (req, res) {
  var event = new Event_t(req.body);
  console.log(event);
  event.save(function (err) {
    if (err) {
      console.log('ERR',err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    else {
      res.json(event);
    }
  });
};

/**
 * Update event picture
 */
exports.changePicture = function (req, res) {
  //to record errors later on
  var message = null;

  //event uploader
  var upload = multer(config.uploads.eventUpload).single('newEventPicture');

  //selects path for images to save to
  var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;
  
  // Filtering to upload only images
  upload.fileFilter = profileUploadFileFilter;

  upload(req, res, function (uploadError) {
    if(uploadError) {
      return res.status(400).send({
        message: 'Error occurred while uploading event picture'
      });
    } else {
      //returns location of photo for saving event
      res.json(config.uploads.eventUpload.dest + req.file.filename);
    }
  });
};


//Read
exports.read = function (req, res) {
  res.json(req.event);
};

//Update
exports.update = function (req, res) {
  var event = req.event;

  event.title = req.body.title;
  event.image = req.body.image;
  event.description = req.body.description;

  event.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    else {
      res.json(event);
    }
  });
};

//Delete
exports.delete = function (req, res) {
  var event = req.event;

  event.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    else {
      res.json(event);
    }
  });
};

//List All
exports.list = function (req, res) {
  Event_t.find().sort('-created_at').exec(function (err, events) {
    if (err) {
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    else {
      res.json(events);
    }
  });
};

//Middleware
exports.eventByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'event is invalid'
    });
  }

  Event_t.findById(id).exec(function (err, event) {
    if (err) {
      return next(err);
    }
    else if (!event) {
      return res.status(404).send({
        message: 'No event with that identifier has been found'
      });
    }
    req.event = event;
    next();
  });
};
