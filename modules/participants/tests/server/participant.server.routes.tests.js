'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  Participant = mongoose.model('Participant'),
  User = mongoose.model('User'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, participant, user;

/**
 * Publication routes tests
 */
describe('Participant CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local',
      roles: ['admin']
    });

    // Save a user to the test db and create new participant
    user.save(function () {
      participant = {
        name: 'Participant Name',
        email: 'test@test.com'
      };

      done();
    });
  });

  it('should be able to save a participant if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new participant
        agent.post('/api/participants')
          .send(participant)
          .expect(200)
          .end(function (participantSaveErr, participantSaveRes) {
            // Handle participant save error
            if (participantSaveErr) {
              return done(participantSaveErr);
            }

            // Get a list of participants
            agent.get('/api/participants')
              .end(function (participantsGetErr, participantsGetRes) {
                // Handle participant save error
                if (participantsGetErr) {
                  return done(participantsGetErr);
                }

                // Get participants list
                var participants = participantsGetRes.body;

                // Set assertions
                //(participants[0].user._id).should.equal(userId);
                (participants[0].name).should.match('Participant Name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save a participant if not logged in', function (done) {
    agent.post('/api/participants')
      .send(participant)
      .expect(403)
      .end(function (participantSaveErr, participantSaveRes) {
        // Call the assertion callback
        done(participantSaveErr);
      });
  });

  it('should not be able to save a participant if no name is provided', function (done) {
    // Invalidate title field
    participant.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new participant
        agent.post('/api/participants')
          .send(participant)
          .expect(400)
          .end(function (participantSaveErr, participantSaveRes) {
            // Set message assertion
            (participantSaveRes.body.message).should.match('Name must be specified!');
            // Handle participant save error
            done(participantSaveErr);
          });
      });
  });

  it('should be able to update a participant if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new participant
        agent.post('/api/participants')
          .send(participant)
          .expect(200)
          .end(function (participantSaveErr, participantSaveRes) {
            // Handle participant save error
            if (participantSaveErr) {
              return done(participantSaveErr);
            }

            // Update participant name
            participant.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing participant
            agent.put('/api/participants/' + participantSaveRes.body._id)
              .send(participant)
              .expect(200)
              .end(function (participantUpdateErr, participantUpdateRes) {
                // Handle participant update error
                if (participantUpdateErr) {
                  return done(participantUpdateErr);
                }

                // Set assertions
                (participantUpdateRes.body._id).should.equal(participantSaveRes.body._id);
                (participantUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to get a list of participants if not signed in', function (done) {
    // Create new participant model instance
    var participantObj = new Participant(participant);

    // Save the participant
    participantObj.save(function () {
      // Request participants
      request(app).get('/api/participants')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('message', 'User is not authorized');

          // Call the assertion callback
          done();
        });

    });
  });

  it('should not be able to get a single participant if not signed in', function (done) {
    // Create new participant model instance
    var participantObj = new Participant(participant);

    // Save the participant
    participantObj.save(function () {
      request(app).get('/api/participants/' + participantObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('message', 'User is not authorized');
          done();
        });
    });
  });

  it('should return proper error for single participant with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/participants/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No participant with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single participant which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent participant
    request(app).get('/api/participants/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No participant with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an participant if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new participant
        agent.post('/api/participants')
          .send(participant)
          .expect(200)
          .end(function (participantSaveErr, participantSaveRes) {
            // Handle participant save error
            if (participantSaveErr) {
              return done(participantSaveErr);
            }

            // Delete an existing participant
            agent.delete('/api/participants/' + participantSaveRes.body._id)
              .send(participant)
              .expect(200)
              .end(function (participantDeleteErr, participantDeleteRes) {
                // Handle participant error error
                if (participantDeleteErr) {
                  return done(participantDeleteErr);
                }

                // Set assertions
                (participantDeleteRes.body._id).should.equal(participantSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Participant.remove().exec(done);
    });
  });
});
