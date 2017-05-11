'use strict';

var app = require('../..');
import request from 'supertest';

var newComments;

describe('Comments API:', function() {

  describe('GET /api/comments', function() {
    var commentss;

    beforeEach(function(done) {
      request(app)
        .get('/api/comments')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          commentss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      commentss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/comments', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/comments')
        .send({
          name: 'New Comments',
          info: 'This is the brand new comments!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newComments = res.body;
          done();
        });
    });

    it('should respond with the newly created comments', function() {
      newComments.name.should.equal('New Comments');
      newComments.info.should.equal('This is the brand new comments!!!');
    });

  });

  describe('GET /api/comments/:id', function() {
    var comments;

    beforeEach(function(done) {
      request(app)
        .get('/api/comments/' + newComments._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          comments = res.body;
          done();
        });
    });

    afterEach(function() {
      comments = {};
    });

    it('should respond with the requested comments', function() {
      comments.name.should.equal('New Comments');
      comments.info.should.equal('This is the brand new comments!!!');
    });

  });

  describe('PUT /api/comments/:id', function() {
    var updatedComments;

    beforeEach(function(done) {
      request(app)
        .put('/api/comments/' + newComments._id)
        .send({
          name: 'Updated Comments',
          info: 'This is the updated comments!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedComments = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedComments = {};
    });

    it('should respond with the updated comments', function() {
      updatedComments.name.should.equal('Updated Comments');
      updatedComments.info.should.equal('This is the updated comments!!!');
    });

  });

  describe('DELETE /api/comments/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/comments/' + newComments._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when comments does not exist', function(done) {
      request(app)
        .delete('/api/comments/' + newComments._id)
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
