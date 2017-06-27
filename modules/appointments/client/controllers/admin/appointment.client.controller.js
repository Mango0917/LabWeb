'use strict';

angular.module('appointments.admin').controller('AppointmentController', ['$scope', '$state', 'Authentication', 'appointmentResolve', 'appointmentAdmin', 'participantsAdmin', 'experimentsAdmin',
  function ($scope, $state, Authentication, appointmentResolve, appointmentAdmin, participantsAdmin, experimentsAdmin) {
    // Get auth info
    $scope.authentication = Authentication;

    // Get specific appointment to view, edit or delete
    $scope.appointment = appointmentResolve;
    $scope.prevExperimentName = $scope.appointment.experiment.experiment_name;
    $scope.prevExperimentConditions = $scope.appointment.experiment.experiment_conditions;


    // Query appointments from DB
    // used for resolving time conflicts
    appointmentAdmin.query(function (data) {
      $scope.appointments = data;
    });

    // Query participants from DB
    participantsAdmin.query(function (data) {
      console.log(data);
      if(data.length === 0){
        $scope.error = 'No Participants to schedule!';
      }else{
        $scope.error = null;
        $scope.participants= data;
      }
    });

    // Query experiments from DB
    experimentsAdmin.query(function (data) {
      console.log(data);
      if(data.length === 0){
        $scope.error = 'No Experiments to schedule!';
      }else{
        $scope.error = null;
        $scope.experiments = data;
      }
    });


    // This controller is shared by edit and detail view
    // therefore, the edit view needs a date time picker initialized
    if($state.current.name === 'admin.appointment-edit'){
      $('#datetimepicker11').datetimepicker({
        sideBySide: true
      });
    }
	

    // Main functions:
    // DELETE APPOINTMENT
    $scope.remove = function (appointment) {
      if (confirm('Are you sure you want to delete this appointment?')) {
        if (appointment) {
          appointment.$remove();

          $scope.appointments.splice($scope.appointments.indexOf(appointment), 1);
        } else {
          $scope.appointment.$remove(function () {
            $state.go('admin.appointments');
          });
        }
      }
    };


    // UPDATE APPOINTMENT
    $scope.update = function (isValid) {

      // Delcare relevant variables used to determine time conflicts
      var time = new Date();
      time.setTime(Date.parse($('#datetimepicker11').data('DateTimePicker').date()));
      var today = new Date();
      var duration = $scope.appointment.duration;
      var location = $scope.appointment.location;


	  // Time Conflict Verification
      // Verify that date is not in the past
      if(time < today){
        $scope.error = 'Appointment can\'t be scheduled for the past!';
        return;
      }
      //Verify that there are no time conflicts
      for(var i = 0; i < $scope.appointments.length; i++){
        var startTime = new Date();
        startTime.setTime(Date.parse($scope.appointments[i].time));
        var endTime = new Date(startTime.getTime() + ($scope.appointments[i].duration*60000));

        //Appointment shouldn't conflict with itself during update
        if ($scope.appointment._id !== $scope.appointments[i]._id){
          if ((time >= startTime) && (time < endTime)){
            console.log('Potential time conflict, checking location');
            if (location === $scope.appointments[i].location){
              $scope.error = 'There is a time conflict at this location';
              return;
            }
          }
        }
      }

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'appointmentForm');

        return false;
      }

	  // Check that appointment has minimum duration
      if ($scope.appointment.duration < 15){
        $scope.error = 'Appointment must be at least 15 minutes long';
        return;
      }

      // Get appointment to assign valid time and update
      var appointment = $scope.appointment;
      appointment.time = time;

      // Update the appointment!
      appointment.$update(function () {
        $state.go('admin.appointment', {
          appointmentId: appointment._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);
