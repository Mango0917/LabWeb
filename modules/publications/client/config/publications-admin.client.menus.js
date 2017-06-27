'use strict';

// Configuring the Publications module to be a part of the menu
angular.module('publications.admin').run(['Menus',
  function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Publications',
      state: 'admin.publications'
    });
  }
]);

