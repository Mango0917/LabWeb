'use strict';

/**
 * Module dependencies.
 */
var participants = require('../controllers/participants.server.controller');
var adminPolicy = require('../../../users/server/policies/admin.server.policy');

module.exports = function (app) {
    // participants collection routes
  app.route('/api/participants')
        .get(adminPolicy.isAllowed, participants.list)
        .post(adminPolicy.isAllowed, participants.create);

    // Single participant routes
  app.route('/api/participants/:participantId')
        .get(adminPolicy.isAllowed, participants.read)
        .put(adminPolicy.isAllowed, participants.update)
        .delete(adminPolicy.isAllowed, participants.delete);

    // Finish by binding the participant middleware
  app.param('participantId', participants.participantByID);
};
