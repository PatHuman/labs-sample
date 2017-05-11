'use strict';

var app = require('../..');
import request from 'supertest';

var newConcept;

describe('Concept API:', function() {

  describe('GET /api/concepts', function() {
    var concepts;

    beforeEach(function(done) {
      request(app)
        .get('/api/concepts')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          concepts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      concepts.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/concepts', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/concepts')
        .send({
          name: 'New Concept',
          info: 'This is the brand new concept!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newConcept = res.body;
          done();
        });
    });

    it('should respond with the newly created concept', function() {
      newConcept.name.should.equal('New Concept');
      newConcept.info.should.equal('This is the brand new concept!!!');
    });

  });

  describe('GET /api/concepts/:id', function() {
    var concept;

    beforeEach(function(done) {
      request(app)
        .get('/api/concepts/' + newConcept._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          concept = res.body;
          done();
        });
    });

    afterEach(function() {
      concept = {};
    });

    it('should respond with the requested concept', function() {
      concept.name.should.equal('New Concept');
      concept.info.should.equal('This is the brand new concept!!!');
    });

  });

  describe('PUT /api/concepts/:id', function() {
    var updatedConcept;

    beforeEach(function(done) {
      request(app)
        .put('/api/concepts/' + newConcept._id)
        .send({
          name: 'Updated Concept',
          info: 'This is the updated concept!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedConcept = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedConcept = {};
    });

    it('should respond with the updated concept', function() {
      updatedConcept.name.should.equal('Updated Concept');
      updatedConcept.info.should.equal('This is the updated concept!!!');
    });

  });

  describe('DELETE /api/concepts/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/concepts/' + newConcept._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when concept does not exist', function(done) {
      request(app)
        .delete('/api/concepts/' + newConcept._id)
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
