function crud(model) {
  function handleError(res, statusCode = 500) {
    return function(err) {
      console.error(err, statusCode)
      res.status(statusCode).send(err)
    }
  };

  function respondWithResult(res, statusCode = 200) {
    return function(entity) {
      if (entity) {
        res.status(statusCode).json(entity)
      }
    }
  }

  function handleEntityNotFound(res) {
    return function(entity) {
      if (!entity) {
        res.status(404).end()
        return null
      }
      return entity
    }
  }

  function saveUpdates(updates) {
    if (updates._id) {
      delete updates._id
    }
    return function(entity) {
      var updated = Object.assign(entity, updates)
      return updated.saveAsync()
      // .spread(function(updated) {
      //   return updated
      // })
    }
  }

  function removeEntity(res) {
    return function(entity) {
      if (entity) {
        return entity.removeAsync()
          .then(function() {
            res.status(204).end()
          })
      }
    }
  }

  var create = function(req, res) {
    model.createAsync(req.body)
      .then(respondWithResult(res, 201))
      .catch(handleError(res))
  }

  var list = function (req, res) {
    model.findAsync()
      .then(respondWithResult(res))
      .catch(handleError(res))
  }

  var read = function (req, res) {
    model.findByIdAsync(req.params.id)
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res))
  }

  var update = function (req, res) {
    model.findByIdAsync(req.params.id)
      .then(handleEntityNotFound(res))
      .then(saveUpdates(req.body))
      .then(respondWithResult(res))
      .catch(handleError(res))
  }

  var _delete = function (req, res) {
    model.findByIdAsync(req.params.id)
      .then(handleEntityNotFound(res))
      .then(removeEntity(res))
      .catch(handleError(res))
  }

  return {
    create,
    list,
    read,
    update,
    delete: _delete
  }
}

module.exports = crud
