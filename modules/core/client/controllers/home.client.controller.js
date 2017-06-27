'use strict';

angular.module('core').controller('HomeController', ['$scope', '$state', 'Authentication',
  function ($scope, $state, Authentication) {
    
    $scope.authentication = Authentication; // This provides Authentication context.

    //Navigation functions
    $scope.goToContact = function() {
      $state.go('core.contact');
    };
    $scope.goToTeam = function() {
      $state.go('core.team');
    };
    $scope.goToAbout = function(){
      $state.go('core.about');
    };
    $scope.goToAudio = function(){
      $state.go('core.audioFiles');
    };
    $scope.goToResearch = function(){
      $state.go('core.researchs');
    };
    $scope.goToPublications = function(){
      $state.go('core.publications');
    };
    $scope.goToEvents = function(){
      $state.go('core.events');
    };
  }
]);
