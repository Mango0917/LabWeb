'use strict';



angular.module('audioFiles').factory('audioFilePublic', ['$resource',
  function ($resource) {
    return $resource('api/audioFiles/:audioFileId', {
      audioFileId: '@_id'
    });
  }
]);
