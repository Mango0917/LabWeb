'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
  function ($resource) {
    return $resource('api/users', {}, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

// Service used for populating Team page. Only holds Display name and imageURL
angular.module('users').factory('Members', ['$resource',
  function ($resource) {
    return $resource('api/members', {}, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

// Users service for accessing a specific user
angular.module('users.admin').factory('Admin', ['$resource',
  function ($resource) {
    return $resource('api/users/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

//Provdiers for participants and experiments, will be moved to corresponding modules
angular.module('participants.admin').factory('participantsAdmin', ['$resource',
  function ($resource) {
    return $resource('api/participants/:participantId', {
      participantId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

angular.module('experiments.admin').factory('experimentsAdmin', ['$resource',
  function ($resource) {
    console.log('experiments admin');
    return $resource('api/experiments/:experimentId', {
      experimentId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
