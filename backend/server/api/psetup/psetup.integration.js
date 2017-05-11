'use strict';

var app = require('../..');
import request from 'supertest';

var newPsetup;

describe('Psetup API:', function() {

  describe('GET /api/project-setup', function() {
    var psetups;

    beforeEach(function(done) {
      request(app)
        .get('/api/project-setup')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          psetups = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      psetups.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/project-setup', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/project-setup')
        .send({
          name: 'New Psetup',
          info: 'This is the brand new psetup!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPsetup = res.body;
          done();
        });
    });

    it('should respond with the newly created psetup', function() {
      newPsetup.name.should.equal('New Psetup');
      newPsetup.info.should.equal('This is the brand new psetup!!!');
    });

  });

  describe('GET /api/project-setup/:id', function() {
    var psetup;

    beforeEach(function(done) {
      request(app)
        .get('/api/project-setup/' + newPsetup._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          psetup = res.body;
          done();
        });
    });

    afterEach(function() {
      psetup = {};
    });

    it('should respond with the requested psetup', function() {
      psetup.name.should.equal('New Psetup');
      psetup.info.should.equal('This is the brand new psetup!!!');
    });

  });

  describe('PUT /api/project-setup/:id', function() {
    var updatedPsetup;

    beforeEach(function(done) {
      request(app)
        .put('/api/project-setup/' + newPsetup._id)
        .send({
          name: 'Updated Psetup',
          info: 'This is the updated psetup!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPsetup = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPsetup = {};
    });

    it('should respond with the updated psetup', function() {
      updatedPsetup.name.should.equal('Updated Psetup');
      updatedPsetup.info.should.equal('This is the updated psetup!!!');
    });

  });

  describe('DELETE /api/project-setup/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/project-setup/' + newPsetup._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when psetup does not exist', function(done) {
      request(app)
        .delete('/api/project-setup/' + newPsetup._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
