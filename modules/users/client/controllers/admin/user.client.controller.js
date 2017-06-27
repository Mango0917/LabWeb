'use strict';

angular.module('users.admin').controller('UserController', ['$scope', '$state', 'Authentication', 'userResolve',
  function ($scope, $state, Authentication, userResolve) {

    $scope.authentication = Authentication; // Get authentication context
    $scope.user = userResolve; // Resolve returns specified user by ID, see routing

    // Make date an easy to read string
    var da = new Date($scope.user.created); 
    $scope.user.created = da.toDateString();

    // Delete user
    $scope.remove = function (user) {
      // Make sure that is desired
      if (confirm('Are you sure you want to delete this user?')) {
        if (user) {
          // Remove and update users
          user.$remove();
          $scope.users.splice($scope.users.indexOf(user), 1);
        } else {
          // If not, go to users list view
          $scope.user.$remove(function () {
            $state.go('admin.users');
          });
        }
      }
    };

    // Update user info
    $scope.update = function (isValid) {

      // Check form
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      // Store changes and update database 
      var user = $scope.user;
      user.$update(function () {
        $state.go('admin.user', {
          userId: user._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);
