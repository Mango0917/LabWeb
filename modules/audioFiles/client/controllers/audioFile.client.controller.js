'use strict';

angular.module('audioFiles').controller('AudioFilePublicController', ['$scope', '$state', 'audioFileResolve',
  function ($scope, $state, audioFileResolve) {   
    $scope.audioFile = audioFileResolve;
  }
]);
