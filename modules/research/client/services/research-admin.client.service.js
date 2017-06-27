'use strict';

angular.module('research.admin').factory('researchAdmin', ['$resource',
  function ($resource) {
    return $resource('api/research/:researchId', {
      researchId: '@_id'
    },
      {
        update: {
          method: 'PUT'
        }
      });
  }
]);