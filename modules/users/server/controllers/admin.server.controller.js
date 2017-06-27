'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Experiment = mongoose.model('Experiment'),
  Appointment = mongoose.model('Appointment'),
  Participant = mongoose.model('Participant'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

// Add user to experiment
function addToExperiment(i, user) {
  if(i<user.experiments.length) {
    Experiment.findById(user.experiments[i]).exec(function(err,experiment){
      if(experiment.users.indexOf(user._id) === -1){//If an experiment on the Database doesn't contain this user add this user ID to its user list.
        experiment.users.push(user._id);
        experiment.save();
      }	  
      addToExperiment(i+1,user);
    });
  } else {
    return;
  }
}

// Remove user from experiment
function removeFromExperiment(i, user) {
  if(i<user.experiments.length) {
    Experiment.findById(user.experiments[i]).exec(function(err,experiment){
      if(experiment.users.indexOf(user._id) !== -1){//If an experiment on the Database does contain this user remove this user ID from its user list.
        experiment.users.splice(experiment.users.indexOf(user._id), 1);
        experiment.save();
      }	  
      removeFromExperiment(i+1,user);
    });
  } else {
    return;
  }
}  

// Add user to appointment  
function addToAppointment(i, user) {
  if(i<user.appointments.length) {
    Appointment.findById(user.appointments[i]).exec(function(err,appointment){
      if(appointment.users.indexOf(user._id) === -1){//If an appointment on the Database doesn't have this user change the user ID to this user.
        appointment.users.push(user._id);
        appointment.save();
      }	  
      addToAppointment(i+1,user);
    });
  } else {
    return;
  }
}

// Remove user from appointment
function removeFromAppointment(i, user) {
  if(i <user.appointments.length) {
    Appointment.findById(user.appointments[i]).exec(function(err,appointment){
      if(appointment.users.indexOf(user._id) !== -1){//If an appointment on the Database has this user change the user ID to null;
        appointment.users.splice(appointment.users.indexOf(user._id), 1);
        appointment.save();
      }	  
      removeFromAppointment(i+1,user);
    });
  } else {
    return;
  }
}

/**
 * Show the current user
 */
exports.read = function (req, res) {
  res.json(req.model);
};

/**
 * Update a User
 */
exports.update = function (req, res) {
  var user = req.model;

  //For security purposes only merge these parameters
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.displayName = user.firstName + ' ' + user.lastName;
  user.roles = req.body.roles;
  user.appointments = req.body.appointments;
  user.experiments = req.body.experiments;

  user.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    removeFromAppointment(0, req.model);
    removeFromExperiment(0, req.model);//To make faster on the DB, could make a new function specifically for updates that would only update the ids which were mutually exclusive.
    addToAppointment(0, user);
    addToExperiment(0, user);
    res.json(user);
  });
};

/**
 * Delete a user
 */
exports.delete = function (req, res) {
  var user = req.model;

  user.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

/**
 * List of Users
 */
exports.list = function (req, res) {
  User.find({}, '-salt -password').sort('-created').populate('user', 'displayName').exec(function (err, users) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(users);
  });
};

/**
 * List of Users
 */
exports.listMembers = function (req, res) {
  console.log('HERRE AT LIST');
  User.find({}, '-salt -password').sort('-created').populate('user', 'displayName').exec(function (err, users) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    var members = [];

    for (var i = 0; i < users.length; i++) {
      members[i] = {
        displayName: users[i].displayName,
        profileImageURL: users[i].profileImageURL
      };
    }

    res.json(members);
  });
};

/**
 * User middleware
 */
exports.userByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

  User.findById(id, '-salt -password').populate('experiments').populate({ path: 'appointments', populate: { path: 'participant' } }).exec(function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error('Failed to load user ' + id));
    }

    req.model = user;
    next();
  });
};
