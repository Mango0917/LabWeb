'use strict';
//Service for updating and reading
angular.module('experiments.admin').factory('experimentsAdmin', 'participantsAdmin', ['$resource',
  function ($resource) {
    return $resource('api/experiments/:experimentId', {
      experimentId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);