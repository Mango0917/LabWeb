'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  AudioFile = mongoose.model('AudioFile');

//mongoose.model('AudioFile', new mongoose.Schema());


/**
 * Globals
 */
var audioFile;

/**
 * Unit tests
 */
describe('AudioFile Model Unit Tests:', function () {
  beforeEach(function (done) {
    audioFile = new AudioFile({
      title: 'Full',
      filePath: 'Name'
    });
    done();
  });

  describe('Method Save audioFile', function () {
    audioFile = new AudioFile({
      title: 'test',
      filePath: 'testPath'
    });
    var _audio = new AudioFile(audioFile);
    this.timeout(10000);
    it('should be able to save without problems', function (done) {
      return _audio.save(function (err) {
        should.not.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without title', function (done) {
      var _audio = new AudioFile(audioFile);
      _audio.title = '';
      return _audio.save(function (err) {
        should.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without filePath', function (done) {
      var _audio = new AudioFile(audioFile);
      _audio.title = 'audioFile Title';
      _audio.filePath = '';
      return _audio.save(function (err) {
        should.exist(err);
        done();
      });
    });
  });
    

  afterEach(function (done) {
    AudioFile.remove().exec(done);
  });
});