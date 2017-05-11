'use strict';

var app = require('../..');
import request from 'supertest';

var newArticles;

describe('Articles API:', function() {

  describe('GET /api/articles', function() {
    var articless;

    beforeEach(function(done) {
      request(app)
        .get('/api/articles')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          articless = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      articless.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/articles', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/articles')
        .send({
          name: 'New Articles',
          info: 'This is the brand new articles!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newArticles = res.body;
          done();
        });
    });

    it('should respond with the newly created articles', function() {
      newArticles.name.should.equal('New Articles');
      newArticles.info.should.equal('This is the brand new articles!!!');
    });

  });

  describe('GET /api/articles/:id', function() {
    var articles;

    beforeEach(function(done) {
      request(app)
        .get('/api/articles/' + newArticles._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          articles = res.body;
          done();
        });
    });

    afterEach(function() {
      articles = {};
    });

    it('should respond with the requested articles', function() {
      articles.name.should.equal('New Articles');
      articles.info.should.equal('This is the brand new articles!!!');
    });

  });

  describe('PUT /api/articles/:id', function() {
    var updatedArticles;

    beforeEach(function(done) {
      request(app)
        .put('/api/articles/' + newArticles._id)
        .send({
          name: 'Updated Articles',
          info: 'This is the updated articles!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedArticles = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedArticles = {};
    });

    it('should respond with the updated articles', function() {
      updatedArticles.name.should.equal('Updated Articles');
      updatedArticles.info.should.equal('This is the updated articles!!!');
    });

  });

  describe('DELETE /api/articles/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/articles/' + newArticles._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when articles does not exist', function(done) {
      request(app)
        .delete('/api/articles/' + newArticles._id)
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
