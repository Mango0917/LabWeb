'use strict';

// Setting up route
angular.module('appointments.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    /*$stateProvider
      .state('admin.appointments', {
        url: '/appointments',
        templateUrl: 'modules/appointments/client/views/admin/list-appointments.client.view.html',
        controller: 'AppointmentListController'
      })
      .state('admin.appointment', {
        url: '/appointments/:appointmentId',
        templateUrl: 'modules/appointments/client/views/admin/view-appointment.client.view.html',
        controller: 'AppointmentController',
        resolve: {
          appointmentResolve: ['$stateParams', 'appointmentsAdmin', function ($stateParams, appointmentsAdmin) {
            return Admin.get({
              appointmentId: $stateParams.appointmentId
            });
          }]
        }
      })
      .state('admin.appointment-edit', {
        url: '/appointments/:appointmentId/edit',
        templateUrl: 'modules/appointments/client/views/admin/edit-appointment.client.view.html',
        controller: 'AppointmentController',
        resolve: {
          appointmentResolve: ['$stateParams', 'appointmentsAdmin', function ($stateParams, appointmentsAdmin) {
            return Admin.get({
              appointmentId: $stateParams.appointmentId
            });
          }]
        }
      })
      .state('admin.appointment-add', {
        url: '/addAppointment',
        controller: 'addAppointmentController',
        templateUrl: 'modules/appointments/client/views/admin/add-appointment.html',
        data: {
          roles: ['admin']
        }
      });*/
  }
]);

