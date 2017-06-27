'use strict';

angular.module('research.admin').controller('ResearchController', ['$scope', '$state', 'Authentication','researchResolve', 'FileUploader', '$timeout', '$window', 
  function ($scope, $state, Authentication, researchResolve, FileUploader, $timeout, $window) {
    $scope.authentication = Authentication;
    $scope.research = researchResolve;
    
    
    
    
    $scope.user = Authentication.user; //dont need this?
    $scope.imageURL = $scope.research.image;

    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: 'api/research/picture',
      alias: 'newResearchPicture'
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
      console.log('SUCCESS UPLOAD', response);
      $scope.success = true;
      
      $scope.research.image = response;
      // Clear upload buttons
      $scope.cancelUpload();

      $scope.update();
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      console.log(response);
      console.log(status);
      alert(response.message);
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
      console.log('STARTING UPLOAD?0');
      $scope.uploader.uploadAll();
      
    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
      $scope.imageURL = $scope.user.profileImageURL;
    };
    
    $scope.remove = function (research) {
      if (confirm('Are you sure you want to delete this research?')) {
        if (research) {
          research.$remove();

          $scope.researchs.splice($scope.researchs.indexOf(research), 1);
        }
        else {
          $scope.research.$remove(function () {
            $state.go('admin.researchs');
          });
        }
      }
    };

    $scope.update = function (isValid) {
      
      var research = $scope.research;
      research.$update(function () {
        $state.go('admin.research', {
          researchId: research._id
        });
      },
      function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);
