'use strict';

// Add Users to admin menu dropdown
angular.module('users.admin').run(['Menus',
  function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Users',
      state: 'admin.users'
    });
  }
]);
