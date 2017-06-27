'use strict';

angular.module('participants.admin').controller('ParticipantController', ['$scope', '$state', 'Authentication', 'participantResolve',
  function ($scope, $state, Authentication, participantResolve) {
    $scope.authentication = Authentication;
    $scope.participant = participantResolve;
    $('#datetimepicker14').datetimepicker({
      maxDate: new Date(),
    });
    $('#datetimepicker15').datetimepicker({
    
    });

    $scope.remove = function (participant) {
      if (confirm('Are you sure you want to delete this participant?')) {
        if (participant) {
          participant.$remove();

          $scope.participants.splice($scope.participants.indexOf(participant), 1);
        } else {
          $scope.participant.$remove(function () {
            $state.go('admin.participants');
          });
        }
      }
    };

    $scope.update = function (isValid) {
      $scope.participant.dob = $('#datetimepicker14').data('DateTimePicker').date().toDate();
      var temp = $scope.participant.dob = $('#datetimepicker15').data('DateTimePicker').date().toDate();
      if(temp.toString() !== 'Invalid Date')
        $scope.participant.lastPaid = temp;
      if($scope.participant.dob.toString() === 'Invalid Date')
        isValid = false;
      console.log($scope.participant.dob);
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'participantForm');
        return false;
      }
      var participant = $scope.participant;

      participant.$update(function () {
        $state.go('admin.participant', {
          participantId: participant._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);
