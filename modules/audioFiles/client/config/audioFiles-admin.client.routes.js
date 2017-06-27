'use strict';

// Setting up routes for audioFiles
angular.module('audioFiles.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin.audioFiles', {
        url: '/audioFiles',
        templateUrl: 'modules/audioFiles/client/views/admin/list-audioFiles.client.view.html',
        controller: 'AudioFileListController'
      })
      .state('admin.audioFile', {
        url: '/audioFiles/:audioFileId',
        templateUrl: 'modules/audioFiles/client/views/admin/view-audioFile.client.view.html',
        controller: 'AudioFileController',
        resolve: {
          audioFileResolve: ['$stateParams', 'audioFileAdmin', function ($stateParams, audioFileAdmin) {
            return audioFileAdmin.get({
              audioFileId: $stateParams.audioFileId
            });
          }]
        }
      })
      .state('admin.audioFile-edit', {
        url: '/audioFiles/:audioFileId/edit',
        templateUrl: 'modules/audioFiles/client/views/admin/edit-audioFile.client.view.html',
        controller: 'AudioFileController',
        resolve: {
          audioFileResolve: ['$stateParams', 'audioFileAdmin', function ($stateParams, audioFileAdmin) {
            return audioFileAdmin.get({
              audioFileId: $stateParams.audioFileId
            });
          }]
        }
      })
      .state('authentication.addAudioFile', {
        url: '/addAudioFile',
        controller: 'addAudioFileController',
        templateUrl: 'modules/audioFiles/client/views/admin/add-audioFile.html',
        data: {
          roles: ['admin']
        }
      });
  }
]);

