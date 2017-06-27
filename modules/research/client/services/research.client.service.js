'use strict';

angular.module('research').factory('researchPublic', ['$resource',
  function ($resource) {
    return $resource('api/research/:researchId', {
      researchId: '@_id'
    });
  }
]);