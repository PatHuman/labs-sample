'use strict';

var app = require('../..');
import request from 'supertest';

var newProjects;

describe('Projects API:', function() {

  describe('GET /api/projects', function() {
    var projectss;

    beforeEach(function(done) {
      request(app)
        .get('/api/projects')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          projectss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      projectss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/projects', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/projects')
        .send({
          name: 'New Projects',
          info: 'This is the brand new projects!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newProjects = res.body;
          done();
        });
    });

    it('should respond with the newly created projects', function() {
      newProjects.name.should.equal('New Projects');
      newProjects.info.should.equal('This is the brand new projects!!!');
    });

  });

  describe('GET /api/projects/:id', function() {
    var projects;

    beforeEach(function(done) {
      request(app)
        .get('/api/projects/' + newProjects._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          projects = res.body;
          done();
        });
    });

    afterEach(function() {
      projects = {};
    });

    it('should respond with the requested projects', function() {
      projects.name.should.equal('New Projects');
      projects.info.should.equal('This is the brand new projects!!!');
    });

  });

  describe('PUT /api/projects/:id', function() {
    var updatedProjects;

    beforeEach(function(done) {
      request(app)
        .put('/api/projects/' + newProjects._id)
        .send({
          name: 'Updated Projects',
          info: 'This is the updated projects!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedProjects = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedProjects = {};
    });

    it('should respond with the updated projects', function() {
      updatedProjects.name.should.equal('Updated Projects');
      updatedProjects.info.should.equal('This is the updated projects!!!');
    });

  });

  describe('DELETE /api/projects/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/projects/' + newProjects._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when projects does not exist', function(done) {
      request(app)
        .delete('/api/projects/' + newProjects._id)
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
