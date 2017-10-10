'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Publication = require('../models/publications.server.model.js'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a publication
 */
exports.create = function (req, res) {
  var publication = new Publication(req.body);
    
  publication.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(publication);
    }
  });
};

/**
 * Show the current publication
 */
exports.read = function (req, res) {
  res.json(req.publication);
};

/**
 * Update a publication
 */
 
exports.update = function (req, res) {
    
  var publication = req.publication;
  publication.title = req.body.title;
  publication.information = req.body.information;
  publication.url = req.body.url;
  
    
    //subject_id not being updated 
    
  publication.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(publication);
    }
  });
};

/**
 * Delete an publication
 */
exports.delete = function (req, res) {
  var publication = req.publication;

  publication.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(publication);
    }
  });
};

/**
 * List of publications
 */
exports.list = function (req, res) {
  Publication.find().sort('-created').exec(function (err, publications) {
        
    if (err) {
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(publications);
    }
  });
};

/**
 * publication middleware
 */
exports.publicationByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'publication is invalid'
    });
  }

  Publication.findById(id).exec(function (err, publication) {
    if (err) {
      return next(err);
    } else if (!publication) {
      return res.status(404).send({
        message: 'No publication with that identifier has been found'
      });
    }
    req.publication = publication;
    next();
  });
};
