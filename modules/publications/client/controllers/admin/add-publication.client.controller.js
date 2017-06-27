'use strict';

//Create controller for Admin side
angular.module('publications').controller('addPublicationController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator',
  //Requires Admin role
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

    //Add publication
    $scope.addPublication = function (isValid) {
      console.log('ADD publication');
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'publicationForm');
        
        return false;
      }

      //Redirects to publications view after successfully adding a new publication
      $http.post('/api/publications', $scope.credentials).success(function (response) {
       
        $state.go('admin.publications', $state.previous.params);
        //error handler
      }).error(function (response) {
        $scope.error = response.message;
      });
    };


  }
]);