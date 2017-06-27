'use strict';

// Setting up route
angular.module('research').config(['$stateProvider',
  function ($stateProvider) {
/*    $stateProvider
    .state('researchs', {
      url: '/research',
      templateUrl: 'modules/research/client/views/list-research.client.view.html',
      controller: 'ResearchListPublicController'
    })
    .state('research', {
      url: '/research/:researchId',
      templateUrl: 'modules/research/client/views/view-research.client.view.html',
      controller: 'ResearchPublicController',
      resolve: {
        researchResolve: ['$stateParams', 'researchPublic', function ($stateParams, researchPublic) {
          return researchPublic.get({
            researchId: $stateParams.researchId
          });
        }]
      }
    }); */
  }
]);
