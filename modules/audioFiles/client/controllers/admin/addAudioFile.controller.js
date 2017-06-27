'use strict';
//Controller to add audio File to database and server
angular.module('audioFiles.admin').controller('addAudioFileController', ['$scope', '$timeout', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator', 'FileUploader',
  function ($scope, $timeout, $state, $http, $location, $window, Authentication, PasswordValidator, FileUploader) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

    // Create audio uploader instance
    $scope.uploader = new FileUploader({
      url: 'api/audioFiles/upload', //where to upload the audio (location)
      alias: 'mp3File'
    });

    // Set audio filter for uploader currently supporting .mp3 and .wav
    $scope.uploader.filters.push({
      name: 'mp3Filter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|mp3|wav|'.indexOf(type) !== -1;
      }
    });

     // Called after the user has successfully uploaded audio
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;
      console.log('audio uploaded');
      // Clear upload buttons
      $scope.cancelUpload();
    };

    // Called after the user has failed to uploaded audio
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();
      console.log('upload error' + response.message);
      // Show error message
      $scope.error = response.message;
    };

    // upload audio file to server
    $scope.uploadMp3File = function () {
      // Clear messages
      $scope.success = $scope.error = null;
      // Start upload
      $scope.uploader.uploadAll();
    };

    // Cancel the upload process and clear the queue
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
    };
	  //add the audio file to the database
    $scope.addAudioFile = function (isValid) {
      $scope.error = null;
      //if error return false and don't add audioFile to database
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'audioForm');
        return false;
      }
      //send http request with data to add audioFile to database
      $http.post('/api/audioFiles/', $scope.credentials).success(function (response) {
        console.log('ADDED AUDIO FILE');
        // And redirect to the previous or list of users 
        $state.go('admin.audioFiles', $state.previous.params);
      }).error(function (response) {
        console.log('FAILED TO ADD AUDIO FILE');
        $scope.error = response.message;
      });
    };
  }
]);
