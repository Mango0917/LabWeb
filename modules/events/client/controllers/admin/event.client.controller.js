'use strict';

angular.module('events.admin').controller('EventController', ['$scope', '$state', 'Authentication', 'eventResolve', 'FileUploader', '$timeout', '$window',
  function ($scope, $state, Authentication, eventResolve, FileUploader,$timeout, $window) {
    $scope.authentication = Authentication;
    $scope.event = eventResolve;
    var da = new Date($scope.event.created_at);
    $scope.event.created_at = da.toDateString();


    $scope.user = Authentication.user;
    $scope.imageURL = $scope.event.image;

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
            $scope.event.image = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;
      $scope.event.image = response;

      // Clear upload buttons
      $scope.cancelUpload();

      $scope.update();
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      console.log(response);
      console.log(status);
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
      $scope.imageURL = $scope.user.profileImageURL;
    };


    

    $scope.remove = function (event) {
      if (confirm('Are you sure you want to delete this event?')) {
        if (event) {
          event.$remove();

          $scope.events.splice($scope.events.indexOf(event), 1);
        } else {
          $scope.event.$remove(function () {
            $state.go('admin.events');
          });
        }
      }
    };

    $scope.update = function (isValid) {
     
      var event = $scope.event;

      event.$update(function () {
        $state.go('admin.event', {
          eventId: event._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);
