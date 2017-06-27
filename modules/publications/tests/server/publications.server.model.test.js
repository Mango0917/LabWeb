'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  Publication = mongoose.model('Publication'),
  User = mongoose.model('User');

/**
 * Globals
 */
var publication, user;

/**
 * Unit tests
 */
describe('Publication Model Unit Tests:', function () {
  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3',
      roles: ['admin']
    });
    user.save(function () {
      publication = new Publication({
        title: 'Publication Title',
        information: 'Publication Information',
        url: 'Publication Url'
      });

      done();

    });
  });
  describe('Method Save', function () {
    this.timeout(10000);
    it('should be able to save without problems', function (done) {
      return publication.save(function (err) {
        should.not.exist(err);
        done();
      });
    });
  

    it('should be able to show an error when try to save without title', function (done) {
      publication.title = '';
      return publication.save(function (err) {
        should.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without information', function (done) {
      publication.title = 'Publication Title';
      publication.information = '';
      return publication.save(function (err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function (done) {
    Publication.remove().exec(done);
  });
});
