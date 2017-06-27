'use strict';

//Queries through publication IDs for non-Admin use
angular.module('publications').factory('publicationsPublic', ['$resource',
  function ($resource) {
    return $resource('api/publications/:publicationId', {
      publicationId: '@_id'
    });
  }
]);