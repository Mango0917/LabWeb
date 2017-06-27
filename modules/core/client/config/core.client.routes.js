'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Home state routing
    $stateProvider
      .state('core', { // Abstract view that controls logic of all public facing views
        abstract: true,
        template: '<ui-view/>',
        views: {
          '': {
            templateUrl: 'modules/core/client/views/core.client.view.html',
            controller: 'CoreController'
          }
        }
      })
    .state('core.home', { // Splash page
      url: '/',
      templateUrl: 'modules/core/client/views/home.client.view.html'
    })
    .state('core.about', { // About page
      url: '/about',
      templateUrl: 'modules/core/client/views/about.client.view.html'
    })
    .state('core.contact', { // Contact page with map and e-mail interface
      url: '/contact',
      templateUrl: 'modules/core/client/views/contact.client.view.html',
      controller: 'ContactController'
    })
    .state('core.team', { // Displays members of research teams
      url: '/team',
      templateUrl: 'modules/core/client/views/team.client.view.html',
      controller: 'TeamController'
    })
    .state('core.audioFiles', { // Public sees pages of audio files
      url: '/audioFiles',
      templateUrl: 'modules/audioFiles/client/views/list-audioFiles.client.view.html',
      controller: 'AudioFileListPublicController'
    })
    .state('core.audioFile', { // Public views and plays audio files
      url: '/audioFiles/:audioFileId',
      templateUrl: 'modules/audioFiles/client/views/view-audioFile.client.view.html',
      controller: 'AudioFilePublicController',
      resolve: {
        audioFileResolve: ['$stateParams', 'audioFilePublic', function ($stateParams, audioFilePublic) { // Resolve to get audio files
          return audioFilePublic.get({
            audioFileId: $stateParams.audioFileId
          });
        }]
      }
    })
    .state('core.researchs', { // Public view of research items
      url: '/research',
      templateUrl: 'modules/research/client/views/list-research.client.view.html',
      controller: 'ResearchListPublicController'
    })
    .state('core.research', { // Public detail view of research item
      url: '/research/:researchId',
      templateUrl: 'modules/research/client/views/view-research.client.view.html',
      controller: 'ResearchPublicController',
      resolve: {
        researchResolve: ['$stateParams', 'researchPublic', function ($stateParams, researchPublic) { // Resolve to get research object
          return researchPublic.get({
            researchId: $stateParams.researchId
          });
        }]
      }
    })
      .state('core.publications', { // Public view list of publications
        url: '/publications',
        templateUrl: 'modules/publications/client/views/list-publications.client.view.html',
        controller: 'PublicationListPublicController'
      })
      .state('core.publication', { // Public detailed view of publicaiton
        url: '/publications/:publicationId',
        templateUrl: 'modules/publications/client/views/view-publication.client.view.html',
        controller: 'PublicationPublicController',
        resolve: {
          publicationResolve: ['$stateParams', 'publicationsPublic', function ($stateParams, publicationsPublic) { // Resolve to get publication object
            return publicationsPublic.get({
              publicationId: $stateParams.publicationId
            });
          }]
        }
      })
    .state('core.events', { // Public view of event list
      url: '/events',
      templateUrl: 'modules/events/client/views/list-events.client.view.html',
      controller: 'EventListPublicController'
    })
    .state('core.event', { // Public view event detail
      url: '/events/:eventId',
      templateUrl: 'modules/events/client/views/view-event.client.view.html',
      controller: 'EventPublicController',
      resolve: {
        eventResolve: ['$stateParams', 'eventsPublic', function ($stateParams, eventsPublic) { // Resolve to get event object
          return eventsPublic.get({
            eventId: $stateParams.eventId
          });
        }]
      }
    })
    //error states
    .state('not-found', {
      url: '/not-found',
      templateUrl: 'modules/core/client/views/404.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('bad-request', {
      url: '/bad-request',
      templateUrl: 'modules/core/client/views/400.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'modules/core/client/views/403.client.view.html',
      data: {
        ignoreState: true
      }
    });
  }
]);
