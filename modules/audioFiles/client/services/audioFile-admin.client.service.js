'use strict';

angular.module('audioFiles.admin').factory('audioFileAdmin', ['$resource',
  function ($resource) {
    return $resource('api/audioFiles/:audioFileId', {
      audioFileId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

