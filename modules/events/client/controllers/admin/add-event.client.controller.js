'use strict';

angular.module('events').controller('addEventController', ['$scope','$timeout', '$state', '$http', '$location', '$window', 'Authentication','FileUploader', 'PasswordValidator',
  function ($scope, $timeout, $state, $http, $location, $window, Authentication, FileUploader, PasswordValidator) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

    $scope.user = Authentication.user;
    $scope.imageURL = './modules/users/client/img/profile/default.png';

    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: 'api/events/picture',
      alias: 'newEventPicture'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    $scope.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            $scope.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;
      $scope.credentials.image = response;

      // Clear upload buttons
      $scope.cancelUpload();

      $scope.addEvent();
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();

      // Show error message
      $scope.error = response.message;
    };

    // Change user profile picture
    $scope.uploadProfilePicture = function () {
      // Clear messages
      $scope.success = $scope.error = null;

      // Start upload
      $scope.uploader.uploadAll();
    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
      $scope.imageURL = $scope.credentials.image;
    };


    //adds event to site database
    $scope.addEvent = function (isValid) {
      $scope.error = null;


      $http.post('/api/events', $scope.credentials).success(function (response) {

        $scope.event = $scope.credentials;
        // And redirect to the previous or list of users 
        $state.go('admin.events', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };


  }
]);