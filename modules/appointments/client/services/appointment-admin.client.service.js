'use strict';

angular.module('appointments.admin').factory('appointmentAdmin', ['$resource',
  function ($resource) {
    return $resource('api/appointments/:appointmentId', {
      appointmentId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

