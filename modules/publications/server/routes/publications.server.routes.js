'use strict';

/**
 * Module dependencies.
 */
var publications = require('../controllers/publications.server.controller');
var adminPolicy = require('../../../users/server/policies/admin.server.policy');

module.exports = function (app) {
    // publications collection routes
  app.route('/api/publications')
        .get(publications.list)
        .post(adminPolicy.isAllowed,publications.create);

    // Single publication routes
  app.route('/api/publications/:publicationId')
        .get(publications.read)
        .put(adminPolicy.isAllowed,publications.update)
        .delete(adminPolicy.isAllowed,publications.delete);

    // Finish by binding the publication middleware
  app.param('publicationId', publications.publicationByID);
};
