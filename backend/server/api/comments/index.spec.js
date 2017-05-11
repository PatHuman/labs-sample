'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var commentsCtrlStub = {
  index: 'commentsCtrl.index',
  show: 'commentsCtrl.show',
  create: 'commentsCtrl.create',
  update: 'commentsCtrl.update',
  destroy: 'commentsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var commentsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './comments.controller': commentsCtrlStub
});

describe('Comments API Router:', function() {

  it('should return an express router instance', function() {
    commentsIndex.should.equal(routerStub);
  });

  describe('GET /api/comments', function() {

    it('should route to comments.controller.index', function() {
      routerStub.get
        .withArgs('/', 'commentsCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/comments/:id', function() {

    it('should route to comments.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'commentsCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/comments', function() {

    it('should route to comments.controller.create', function() {
      routerStub.post
        .withArgs('/', 'commentsCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/comments/:id', function() {

    it('should route to comments.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'commentsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/comments/:id', function() {

    it('should route to comments.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'commentsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/comments/:id', function() {

    it('should route to comments.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'commentsCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
