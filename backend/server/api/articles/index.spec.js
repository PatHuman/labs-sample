'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var articlesCtrlStub = {
  index: 'articlesCtrl.index',
  show: 'articlesCtrl.show',
  create: 'articlesCtrl.create',
  update: 'articlesCtrl.update',
  destroy: 'articlesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var articlesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './articles.controller': articlesCtrlStub
});

describe('Articles API Router:', function() {

  it('should return an express router instance', function() {
    articlesIndex.should.equal(routerStub);
  });

  describe('GET /api/articles', function() {

    it('should route to articles.controller.index', function() {
      routerStub.get
        .withArgs('/', 'articlesCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/articles/:id', function() {

    it('should route to articles.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'articlesCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/articles', function() {

    it('should route to articles.controller.create', function() {
      routerStub.post
        .withArgs('/', 'articlesCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/articles/:id', function() {

    it('should route to articles.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'articlesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/articles/:id', function() {

    it('should route to articles.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'articlesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/articles/:id', function() {

    it('should route to articles.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'articlesCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
