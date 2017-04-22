/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/angtests              ->  index
 * POST    /api/angtests              ->  create
 * GET     /api/angtests/:id          ->  show
 * PUT     /api/angtests/:id          ->  upsert
 * PATCH   /api/angtests/:id          ->  patch
 * DELETE  /api/angtests/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Angtest from './angtest.model';

// データ初期化
Angtest.find({}).remove(function() {
  Angtest.create({
    name: 'test1',
    info: 'hoge2',
    active: true
  }, {
    name: 'test2',
    info: 'hoge2',
    active: true
  }, function(err) {
    console.log('finished populating Angtests');
  });
});

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Angtests
export function index(req, res) {
  return Angtest.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Angtest from the DB
export function show(req, res) {
  return Angtest.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Angtest in the DB
export function create(req, res) {
  return Angtest.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Angtest in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Angtest.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Angtest in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Angtest.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Angtest from the DB
export function destroy(req, res) {
  return Angtest.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
