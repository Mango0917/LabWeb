'use strict';

angular.module('participants').controller('addParticipantController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;
    $('#datetimepicker12').datetimepicker({
      maxDate: new Date()
    });
    $('#datetimepicker13').datetimepicker({

    });
    $scope.addParticipant = function (isValid) {
      console.log('ADD PARTICIPANT');
      $scope.error = null;
      $scope.credentials.dob = $('#datetimepicker12').data('DateTimePicker').date().toDate();
      var temp = $scope.credentials.dob = $('#datetimepicker13').data('DateTimePicker').date().toDate();
      if(temp.toString() === 'Invalid Date')
        $scope.credentials.lastPaid = temp;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'participantForm');

        return false;
      }
      console.log('FORM IS VALID');

      $http.post('/api/participants', $scope.credentials).success(function (response) {
        // And redirect to the previous or list of users 
        $state.go('admin.participants', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

  
  }
]);
