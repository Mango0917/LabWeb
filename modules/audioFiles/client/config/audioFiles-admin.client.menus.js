'use strict';

// Configuring the audioFiles module
angular.module('audioFiles.admin').run(['Menus',
  function (Menus) {
  	//submenu for audioFiles
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Audio Files',
      state: 'admin.audioFiles'
    });
  }
]);

