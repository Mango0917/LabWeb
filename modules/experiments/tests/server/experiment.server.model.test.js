'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose');
  //User = require('/modules/users/server/models/user.server.model.js'),
  //Publication = require('../server/models/publications.server.model.js');
  //config = require('../config/publication.server.config');

//mongoose.model('User', new mongoose.Schema());
var Experiment = mongoose.model('Experiment');
var User = mongoose.model('User');

/**
 * Globals
 */
var experiment, user;

/**
 * Unit tests
 */
describe('Experiment Model Unit Tests:', function () {
  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    });
    user.save(function () {

      experiment = new Experiment({
        tags: 'Exp tag',
        requirements: 'Exp requirements',
        display_name : 'Display name',
        completed: true,
        requires_eyeglasses: true,
        experiment_name: 'Exp Name',
        experiment_conditions: 'Exp conditions'
      });

      done();

    });
  });
  describe('Method Save', function () {
    this.timeout(10000);
    it('should be able to save without problems', function (done) {
      return experiment.save(function (err) {
        should.not.exist(err);
        done();
      });
    });
  

    it('should be able to show an error when try to save without experiment name', function (done) {
      experiment.experiment_name = '';
      return experiment.save(function (err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function (done) {
    Experiment.remove().exec(done);
  });
});
