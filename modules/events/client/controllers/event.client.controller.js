'use strict';


//controller for public facing event detail page
angular.module('events').controller('EventPublicController', ['$scope', '$state', 'eventResolve',
  function ($scope, $state, eventResolve) {
    $scope.event = eventResolve;
  }
]);
