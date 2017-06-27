'use strict';

// Setting up route for adding a publication
angular.module('publications.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('authentication.addPublication', {
        url: '/addPublication',
        controller: 'addPublicationController',
        templateUrl: 'modules/publications/client/views/admin/add-publication.client.view.html',
        //requires admin role
        data: {
          roles: ['admin']
        }
      });
      
  }
]);

