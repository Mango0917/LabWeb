'use strict';

// Configuring the Articles module
angular.module('participants.admin').run(['Menus',
  function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Participants',
      state: 'admin.participants'
    });
  }
]);

