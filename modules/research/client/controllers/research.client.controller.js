'use strict';

angular.module('research').controller('ResearchPublicController', ['$scope', '$state','researchResolve',
  function ($scope, $state, researchResolve) {

    $scope.research = researchResolve;
    

  }
]);
