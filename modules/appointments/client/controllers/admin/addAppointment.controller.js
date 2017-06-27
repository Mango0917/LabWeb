'use strict';

angular.module('appointments.admin').controller('addAppointmentController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator', 'participantsAdmin', 'appointmentAdmin', 'experimentsAdmin',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator, participantsAdmin, appointmentAdmin, experimentsAdmin) {
    // Get auth info
    $scope.authentication = Authentication;

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;


	// QUERY DATABASE FIRST AND ASSIGN TO SCOPE

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
    


    // Configure DateTime Picker
    $('#datetimepicker11').datetimepicker({
      sideBySide: true
    });



    // Main function:
    // ADDING APPOINTMENT
    $scope.addAppointment = function (isValid) {

      // Delcare relevant variables used to determine time conflicts
      var time = new Date();
      time.setTime(Date.parse($('#datetimepicker11').data('DateTimePicker').date()));
      var today = new Date();
      var duration = $scope.credentials.duration;
      console.log(duration);
      var location = $scope.credentials.location;
      var participant = $scope.credentials.participant;


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
        if ((time >= startTime) && (time < endTime)){
          console.log('Potential time conflict, checking participant and location');
          if ($scope.appointments[i].participant._id === participant){
            $scope.error = 'This participant is already scheduled at this time!';
            return;
          }
          if (location === $scope.appointments[i].location){
            $scope.error = 'There is a time conflict at this location';
            return;
          }
        }
      }

      // The time is valid, assign to form credentials
      $scope.credentials.time = time; 


      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'appointmentForm');
        console.log('NOT VALID');

        return false;
      }

	  // Check that appointment has minimum duration
      if ($scope.credentials.duration < 15){
        $scope.error = 'Appointment must be at least 15 minutes long';
        return;
      }

      // Clear error
      $scope.error = null;


      // Finally post the appointment
      $http.post('/api/appointments', $scope.credentials).success(function (response) {
        // And redirect to previous | calendar 
        $state.go('admin.appointments', $state.previous.params);
      }).error(function (response) {
        // Request gone wrong
        $scope.error = response.message;
      });
    };

  
  }
]);
