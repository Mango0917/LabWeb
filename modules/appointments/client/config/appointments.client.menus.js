'use strict';

// Configuring the Articles Menu module
angular.module('appointments.admin').run(['Menus',
  function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Appointments',
      state: 'admin.appointments'
    });
  }
]);

