'use strict';

// Configuring the Articles module
angular.module('experiments.admin').run(['Menus',
  function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Experiments',
      state: 'admin.experiments'
    });
  }
]);

