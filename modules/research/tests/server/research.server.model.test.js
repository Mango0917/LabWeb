'use strict';

var should = require('should'), 
  mongoose = require('mongoose'), 
  Research = mongoose.model('Research');

var research, id;

research = {
  title: 'RESEARCH_TITLE', 
  image: './sdfa/asdf/asdf/asd/f/asdf', 
  content: 'RESEARCH_CONTENT' 
};

describe('Research Schema Unit Tests', function() {

  // before(function(done) {
    // mongoose.connect(config.db.uri);
    // done();
  // });

  describe('Saving to database', function() {
    /*
      Mocha's default timeout for tests is 2000ms. To ensure that the tests do not fail 
      prematurely, we can increase the timeout setting with the method this.timeout()
     */
    this.timeout(10000);

    it('throws an error when image not provided', function(done){
      new Research({
        title: research.title,
        content: research.content
      }).save(function(err){
        should.exist(err);        
        done();
      });
    });

    it('saves properly when all three properties provided', function(done){
      new Research(research).save(function(err, research){
        should.not.exist(err);
        id = research._id;
        done();
      });
    });

    it('throws an error when title not provided', function(done){
      new Research({
        image: research.image,
        content: research.content
      }).save(function(err){
        should.exist(err);
        done();
      });
    });

    it('throws an error when content not provided', function(done){
      new Research({
        title: research.title,
        image: research.image
      }).save(function(err){
        should.exist(err);
        done();
      });
    });

  });

  afterEach(function(done) {
    if(id) {
      Research.remove({ _id: id }).exec(function() {
        id = null;
        done();
      });
    } else {
      done();
    }
  });
});
