'use strict';

//Controller for non-Admins
angular.module('publications').controller('PublicationPublicController', ['$scope', '$state', 'publicationResolve',
  function ($scope, $state, publicationResolve) {
    $scope.publication = publicationResolve;
  }
]);
