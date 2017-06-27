'use strict';

// Configuring the research module
angular.module('research.admin').run(['Menus',
  function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Research',
      state: 'admin.researchs'
    });
  }
]);
