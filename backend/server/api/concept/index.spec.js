'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var conceptCtrlStub = {
  index: 'conceptCtrl.index',
  show: 'conceptCtrl.show',
  create: 'conceptCtrl.create',
  update: 'conceptCtrl.update',
  destroy: 'conceptCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var conceptIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './concept.controller': conceptCtrlStub
});

describe('Concept API Router:', function() {

  it('should return an express router instance', function() {
    conceptIndex.should.equal(routerStub);
  });

  describe('GET /api/concepts', function() {

    it('should route to concept.controller.index', function() {
      routerStub.get
        .withArgs('/', 'conceptCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/concepts/:id', function() {

    it('should route to concept.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'conceptCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/concepts', function() {

    it('should route to concept.controller.create', function() {
      routerStub.post
        .withArgs('/', 'conceptCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/concepts/:id', function() {

    it('should route to concept.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'conceptCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/concepts/:id', function() {

    it('should route to concept.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'conceptCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/concepts/:id', function() {

    it('should route to concept.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'conceptCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
