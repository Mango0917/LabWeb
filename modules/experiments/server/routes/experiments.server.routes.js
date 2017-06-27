'use strict';

/**
 * Module dependencies.
 */
var	experiments = require('../controllers/experiments.server.controller');
var adminPolicy = require('../../../users/server/policies/admin.server.policy');

module.exports = function (app) {
  // experiments collection routes
  app.route('/api/experiments')
    .get(adminPolicy.isAllowed, experiments.list)
    .post(adminPolicy.isAllowed, experiments.create);

	// Single participant routes
  app.route('/api/experiments/:experimentId')
    .get(adminPolicy.isAllowed, experiments.read)
    .put(adminPolicy.isAllowed, experiments.update)
    .delete(adminPolicy.isAllowed, experiments.delete);

	// Finish by binding the experiment middleware
  app.param('experimentId', experiments.experimentByID);
};
