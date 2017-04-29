'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var angtestCtrlStub = {
  index: 'angtestCtrl.index',
  show: 'angtestCtrl.show',
  create: 'angtestCtrl.create',
  upsert: 'angtestCtrl.upsert',
  patch: 'angtestCtrl.patch',
  destroy: 'angtestCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var angtestIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './angtest.controller': angtestCtrlStub
});

describe('Angtest API Router:', function() {
  it('should return an express router instance', function() {
    angtestIndex.should.equal(routerStub);
  });

  describe('GET /api/angtests', function() {
    it('should route to angtest.controller.index', function() {
      routerStub.get
        .withArgs('/', 'angtestCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/angtests/:id', function() {
    it('should route to angtest.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'angtestCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/angtests', function() {
    it('should route to angtest.controller.create', function() {
      routerStub.post
        .withArgs('/', 'angtestCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/angtests/:id', function() {
    it('should route to angtest.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'angtestCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/angtests/:id', function() {
    it('should route to angtest.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'angtestCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/angtests/:id', function() {
    it('should route to angtest.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'angtestCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
