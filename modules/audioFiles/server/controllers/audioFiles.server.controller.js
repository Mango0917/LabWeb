'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  AudioFile = require('../models/audioFiles.server.model.js'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

var _ = require('lodash'),
  fs = require('fs'),
  multer = require('multer'),
  config = require(path.resolve('./config/config'));

var gName = null;

var deleteMp3 = function(audiofile){
  fs.unlink(audiofile.filePath);
};

/**
 * Create an audio file
 */
exports.create = function (req, res) {
  var audiofile = new AudioFile(req.body);
  //set file path to previously uploaded file
  if(gName !== null){
    audiofile.filePath = gName;
  }
  audiofile.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } 
    else {
      //reset file name
      gName = null;
      res.json(audiofile);
    }
  });
};
/**
 * Show the current audiofile
 */
exports.read = function (req, res) {
  res.json(req.audiofile);
};

/**
 * Update a audiofile
 */
 
exports.update = function (req, res) {
    
  var audiofile = req.audiofile;
    
  audiofile.title= req.body.title;
  audiofile.filePath = req.body.filePath;
    
  audiofile.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(audiofile);
    }
  });
};

/**
 * Delete an audiofile
 */
exports.delete = function (req, res) {
  var audiofile = req.audiofile;

  audiofile.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      //call delteMp3 to delete associated file from the server
      deleteMp3(audiofile);
      res.json(audiofile);
    }
  });
};

/**
 * List of audioFiles
 */
exports.list = function (req, res) {
  AudioFile.find().sort('-created').exec(function (err, audioFiles) {
        
    if (err) {
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(audioFiles);
    }
  });
};

/**
 * audiofile middleware
 */
exports.audioFileByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'audiofile is invalid'
    });
  }

  AudioFile.findById(id).exec(function (err, audiofile) {
    if (err) {
      return next(err);
    } else if (!audiofile) {
      return res.status(404).send({
        message: 'No audiofile with that identifier has been found'
      });
    }
    req.audiofile = audiofile;
    next();
  });
};
/**
 * Upload mp3 file to server
 */
exports.uploadMp3File = function (req, res) {
  var upload = multer(config.uploads.mp3Upload).single('mp3File');
  var mp3UploadFilter = require(path.resolve('./config/lib/multer')).mp3UploadFilter;
  upload(req, res, function (uploadError) {
    if(uploadError) {
      return res.status(400).send({
        message: 'Error occurred while uploading mp3'
      });
    } 
    else {
      //save file path in a variable
      gName = config.uploads.mp3Upload.dest + req.file.filename;
      res.send(gName);
    }
  });
};
/**
 * Get mp3 file from server
 */
exports.getMp3 = function (req,res){
  var filePath;
  if(req === null)
    res.send('null request');
  else{
    filePath = req.body.filePath;
  }
  //read file from file path on server
  fs.readFile(filePath,'base64', function (err, data) {
    if (err) {
      res.send('error while reading');
      console.error(err);
    }
    //data pre populated with right encoding
    var d = 'data:audio/mp3;base64,' + data;
    res.send(d);
  });


};

