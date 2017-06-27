'use strict';

var should = require('should'), 
  mongoose = require('mongoose'),
  request = require('supertest'), 
  path = require('path'),
  express = require(path.resolve('./config/lib/express')),
  Research = mongoose.model('Research');

/* Global variables */
var app, agent, research, id;

/* Unit tests for testing server side routes for the research API */
describe('Researches CRUD tests', function() {

  this.timeout(10000);

  before(function(done) {
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  it('should it able to retrieve all research', function(done) {
    agent.get('/api/research')
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res);
        res.body.should.have.length(2);
        done();
      });
  });
  it('should be able to retrieve a single research', function(done) {
    Research.findOne({ title: 'Research1' }, function(err, research) {
      if(err) {
        console.log(err);
      } else {
        agent.get('/api/research/' + research._id)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            should.exist(res);
            res.body.title.should.equal('Research1');
            res.body.content.should.equal('stuff');
            res.body.image.should.equal('./modules/research/client/img/6b096ebcb98a9a64b4a87e7f2b0125a7');
            res.body._id.should.equal(research._id.toString());
            done();
          });
      }
    });
  });

  it('should be able to save a research', function(done) {
    var research = {
      title: 'Research3', 
      content: 'new_stuff', 
      image: './modules/research/client/img/c6da9d8a3ed2176896a7b70e04257cce'
    };
    agent.post('/api/research')
      .send(research)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res.body._id);
        res.body.title.should.equal('Research3');
        res.body.content.should.equal('new_stuff');
        res.body.image.should.equal('./modules/research/client/img/c6da9d8a3ed2176896a7b70e04257cce');
        id = res.body._id;
        done();
      });
  });

  it('should be able to update a research', function(done) {
    var updatedListing = {
      content: 'updated_stuff', 
      title: 'Research3_Updated', 
      image: 'a_new_url'
    };

    agent.put('/api/research/' + id)
      .send(updatedListing)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res.body._id);
        res.body.title.should.equal('Research3_Updated');
        res.body.content.should.equal('updated_stuff');
        res.body.image.should.equal('a_new_url');
        done();
      });
  });

  it('should be able to delete a research', function(done) {
    agent.delete('/api/research/' + id)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res);

        agent.get('/api/research/' + id) 
          .expect(400)
          .end(function(err, res) {
            id = undefined;
            done();
          });
      });
  });

  after(function(done) {
    if(id) {
      Research.remove({ _id: id }, function(err){
        if(err) throw err;
        done();
      });
    }
    else {
      done();
    }
  });
});
