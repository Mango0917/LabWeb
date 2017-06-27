'use strict';

// Setting up route
angular.module('research.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
    .state('admin.researchs', {
      url: '/research',
      templateUrl: 'modules/research/client/views/admin/list-research.client.view.html',
      controller: 'ResearchListController'
    })
    .state('admin.research', {
      url: '/research/:researchId',
      templateUrl: 'modules/research/client/views/admin/view-research.client.view.html',
      controller: 'ResearchController',
      resolve: {
        researchResolve: ['$stateParams', 'researchAdmin', function ($stateParams, researchAdmin) {
          return researchAdmin.get({
            researchId: $stateParams.researchId
          });
        }]
      }
    })
    .state('admin.research-edit', {
      url: '/research/:researchId/edit',
      templateUrl: 'modules/research/client/views/admin/edit-research.client.view.html',
      controller: 'ResearchController',
      resolve: {
        researchResolve: ['$stateParams', 'researchAdmin', function ($stateParams, researchAdmin) {
          return researchAdmin.get({
            researchId: $stateParams.researchId
          });
        }]
      }
    })
    .state('authentication.addResearch', {
      url: '/addResearch',
      controller: 'addResearchController',
      templateUrl: 'modules/research/client/views/admin/add-research.client.view.html',
      data: {
        roles: ['admin']
      }
    });
  }
]);