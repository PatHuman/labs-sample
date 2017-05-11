'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var psetupCtrlStub = {
  index: 'psetupCtrl.index',
  show: 'psetupCtrl.show',
  create: 'psetupCtrl.create',
  update: 'psetupCtrl.update',
  destroy: 'psetupCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var psetupIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './psetup.controller': psetupCtrlStub
});

describe('Psetup API Router:', function() {

  it('should return an express router instance', function() {
    psetupIndex.should.equal(routerStub);
  });

  describe('GET /api/project-setup', function() {

    it('should route to psetup.controller.index', function() {
      routerStub.get
        .withArgs('/', 'psetupCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/project-setup/:id', function() {

    it('should route to psetup.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'psetupCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/project-setup', function() {

    it('should route to psetup.controller.create', function() {
      routerStub.post
        .withArgs('/', 'psetupCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/project-setup/:id', function() {

    it('should route to psetup.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'psetupCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/project-setup/:id', function() {

    it('should route to psetup.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'psetupCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/project-setup/:id', function() {

    it('should route to psetup.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'psetupCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
