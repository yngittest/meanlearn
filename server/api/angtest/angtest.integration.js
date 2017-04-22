'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newAngtest;

describe('Angtest API:', function() {
  describe('GET /api/angtests', function() {
    var angtests;

    beforeEach(function(done) {
      request(app)
        .get('/api/angtests')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          angtests = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      angtests.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/angtests', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/angtests')
        .send({
          name: 'New Angtest',
          info: 'This is the brand new angtest!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newAngtest = res.body;
          done();
        });
    });

    it('should respond with the newly created angtest', function() {
      newAngtest.name.should.equal('New Angtest');
      newAngtest.info.should.equal('This is the brand new angtest!!!');
    });
  });

  describe('GET /api/angtests/:id', function() {
    var angtest;

    beforeEach(function(done) {
      request(app)
        .get(`/api/angtests/${newAngtest._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          angtest = res.body;
          done();
        });
    });

    afterEach(function() {
      angtest = {};
    });

    it('should respond with the requested angtest', function() {
      angtest.name.should.equal('New Angtest');
      angtest.info.should.equal('This is the brand new angtest!!!');
    });
  });

  describe('PUT /api/angtests/:id', function() {
    var updatedAngtest;

    beforeEach(function(done) {
      request(app)
        .put(`/api/angtests/${newAngtest._id}`)
        .send({
          name: 'Updated Angtest',
          info: 'This is the updated angtest!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedAngtest = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAngtest = {};
    });

    it('should respond with the updated angtest', function() {
      updatedAngtest.name.should.equal('Updated Angtest');
      updatedAngtest.info.should.equal('This is the updated angtest!!!');
    });

    it('should respond with the updated angtest on a subsequent GET', function(done) {
      request(app)
        .get(`/api/angtests/${newAngtest._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let angtest = res.body;

          angtest.name.should.equal('Updated Angtest');
          angtest.info.should.equal('This is the updated angtest!!!');

          done();
        });
    });
  });

  describe('PATCH /api/angtests/:id', function() {
    var patchedAngtest;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/angtests/${newAngtest._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Angtest' },
          { op: 'replace', path: '/info', value: 'This is the patched angtest!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedAngtest = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedAngtest = {};
    });

    it('should respond with the patched angtest', function() {
      patchedAngtest.name.should.equal('Patched Angtest');
      patchedAngtest.info.should.equal('This is the patched angtest!!!');
    });
  });

  describe('DELETE /api/angtests/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/angtests/${newAngtest._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when angtest does not exist', function(done) {
      request(app)
        .delete(`/api/angtests/${newAngtest._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
