'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Admin Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin', 'user'],
    allows: [{
      resources: '/api/participants/:participantId',
      permissions: '*'
    },{
      resources: '/api/experiments/:experimentId',
      permissions: '*'
    },{
      resources: '/api/participants',
      permissions: '*'
    }, {
      resources: '/api/appointments',
      permissions: '*'
    },{
      resources: '/api/appointments/:appointmentId',
      permissions: '*'
    }, {
      resources: '/api/experiments',
      permissions: '*'
    }, {
      resources: '/api/audioFiles',
      permissions: '*'
    }, {
      resources: '/api/audioFiles/:audioFileId',
      permissions: '*'
    }, {
      resources: '/api/audioFiles/upload',
      permissions: '*'
    }, {
      resources: '/api/audioFiles/mp3',
      permissions: '*'
    }, {
      resources: '/api/publications',
      permissions: '*'
    }, {
      resources: '/api/publications/:publicationId',
      permissions: '*'
    }, {
      resources: '/api/research',
      permissions: '*'
    }, {
      resources: '/api/research/:researchId',
      permissions: '*'
    }, {
      resources: '/api/events',
      permissions: '*'
    }, {
      resources: '/api/events/:eventId',
      permissions: '*'
    }]
  },{
    roles: ['admin'],
    allows: [{
      resources: '/api/users',
      permissions: '*'
    }, {
      resources: '/api/users/:userId',
      permissions: '*'
    }]
  }]);
};

/**
 * Check If Admin Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred.
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
