'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Experiment = mongoose.model('Experiment'),
  Appointment = mongoose.model('Appointment'),
  Participant = mongoose.model('Participant'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

  
function addToParticipant(i, experiment) {
  if(i<experiment.participants.length) {
    Participant.findById(experiment.participants[i]).exec(function(err,participant){
      if(participant.experiments.indexOf(experiment._id) === -1){//If a participant on the Database doesn't contain this experiment add this experiment ID to his/her experiment list.
        participant.experiments.push(experiment._id);
        participant.save();
      }	  
      addToParticipant(i+1,experiment); //Recursion-based code must execute recursively
    });
  } else {
    return;
  }
}

function removeFromParticipant(i, experiment) {
  if(i<experiment.participants.length) {
    Participant.findById(experiment.participants[i]).exec(function(err,participant){
      if(participant.experiments.indexOf(experiment._id) !== -1){//If a participant on the Database does contain this experiment remove this experiment ID to his/her experiment list.
        participant.experiments.splice(participant.experiments.indexOf(experiment._id), 1);
        participant.save();
      }	  
      removeFromParticipant(i+1,experiment);
    });
  } else {
    return;
  }
}

function addToAppointment(i, experiment) {
  if(i<experiment.appointments.length) {
    Appointment.findById(experiment.appointments[i]).exec(function(err,appointment){
      if(appointment.experiments.indexOf(experiment._id) === -1){//If an appointment on the Database doesn't contain this experiment add this experiment ID to its experiment list.
        appointment.experiments.push(experiment._id);
        appointment.save();
      }	  
      addToAppointment(i+1,experiment);
    });
  } else {
    return;
  }
}

function removeFromAppointment(i, experiment) {
  if(i<experiment.appointments.length) {
    Appointment.findById(experiment.appointments[i]).exec(function(err,appointment){
      if(appointment.experiments.indexOf(experiment._id) !== -1){//If an appointment on the Database does contain this experiment remove this experiment ID to its experiment list.
        appointment.experiments.splice(appointment.experiments.indexOf(experiment._id), 1);
        appointment.save();
      }	  
      removeFromAppointment(i+1,experiment);
    });
  } else {
    return;
  }
}

function addToUser(i, experiment) {
  console.log('In add to user');
  if(i<experiment.users.length) {
    console.log('Trying to find user');
    User.findById(experiment.users[i]).exec(function(err,user){
      if(user.experiments.indexOf(experiment._id) === -1){//If a user on the Database doesn't contain this experiment add this experiment ID to his/her experiment list.
        user.experiments.push(experiment._id);
        console.log(user);
        console.log('Trying to add to user');
        console.log(user);
        user.save();
      }
      addToUser(i+1,experiment);
    });
  } else {
    return;
  }
}

function removeFromUser(i, experiment) {
  if(i<experiment.users.length) {
    User.findById(experiment.users[i]).exec(function(err,user){
      if(user.experiments.indexOf(experiment._id) !== -1){//If a user on the Database does contain this experiment remove this experiment ID to his/her experiment list.
        user.experiments.splice(user.experiments.indexOf(experiment._id), 1);
        user.save();
      }	  
      removeFromAppointment(i+1,experiment);
    });
  } else {
    return;
  }
}

//
/**
 * Create a experiment
 */
exports.create = function (req, res) {
  console.log(req.body);
  var experiment = new Experiment(req.body);

  experiment.save(function (err) {
    if (err) {
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    else {
      addToParticipant(0, experiment);
      addToAppointment(0, experiment);
      addToUser(0, experiment);
      res.json(experiment);
    }
  });
};


/**
 * Show the current experiment
 */
exports.read = function (req, res) {
  res.json(req.experiment);
};

/**
 * Update a experiment
 */
exports.update = function (req, res) {
  var experiment = req.experiment;

  experiment.participants = req.body.participants;
  experiment.users = req.body.users;
  experiment.appointments = req.body.appointments;
  experiment.completed = req.body.completed;
  experiment.requires_eyeglasses = req.body.requires_eyeglasses;
  experiment.experiment_name = req.body.experiment_name;
  experiment.experiment_conditions = req.body.experiment_conditions;

  experiment.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    else {
      removeFromAppointment(0, req.experiment);
      removeFromParticipant(0, req.experiment);
      removeFromUser(0, req.experiment);
      addToAppointment(0, experiment);
      addToParticipant(0, experiment);
      addToUser(0, experiment);
      res.json(experiment);
    }
  });
};

/**
 * Delete an experiment
 */
exports.delete = function (req, res) {
  var experiment = req.experiment;

  experiment.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    else {
      removeFromAppointment(0, experiment);
      removeFromParticipant(0, experiment);
      removeFromUser(0, experiment);
      res.json(experiment);
    }
  });
};

/**
 * List of experiments
 */
exports.list = function (req, res) {
  Experiment.find().populate('participants', 'name email phone_number conditions').sort('experiment_name').exec(function (err, experiments) {  
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(experiments);
    }
  });
};

/**
 * experiment middleware
 */
exports.experimentByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'experiment is invalid'
    });
  }

  Experiment.findById(id).populate('participants', 'name email phone_number conditions').populate('appointments').populate('users').populate({ path: 'appointments', populate: { path: 'participant' } }).exec(function (err, experiment) {
    if (err) {
      return next(err);
    } else if (!experiment) {
      return res.status(404).send({
        message: 'No experiment with that identifier has been found'
      });
    }
    req.experiment = experiment;
    next();
  });
};
