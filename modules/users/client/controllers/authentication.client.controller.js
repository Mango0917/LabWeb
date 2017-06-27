'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

	// If user is signed in, redirect to admin if state is signin
    if ($scope.authentication.user) {
      if ($state.$current.name === 'authentication.signin') {
        $location.path('/admin/appointments');
      }
    }
    // Guests get redirected to home if they attempt to signup
    else{
      if ($state.$current.name === 'authentication.signup') {
        $location.path('/');
      }
    }

    // Sign up new user
    $scope.signup = function (isValid) {
      $scope.error = null;

      // Make sure form is valid
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      // Add user to database
      $http.post('/api/auth/signup', $scope.credentials).success(function (response) {
        // And redirect to the previous or list of users 
        $state.go('admin.users', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    // Log in 
    $scope.signin = function (isValid) {
      $scope.error = null;

      // Check form validity
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');
			
        return false;
      }

      // Check credentials against database
      $http.post('/api/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the previous or admin-home page
        $state.go($state.previous.state.name || 'admin.appointments', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    // OAuth provider request
    $scope.callOauthProvider = function (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    };
  }
]);
