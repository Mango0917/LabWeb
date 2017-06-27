'use strict';

// Members is factory that supplies Users name and profile pic for public access
angular.module('core').controller('TeamController', ['$scope', '$state', 'Members',
  function ($scope, $state, Members) {

    // Retrieve Users data for use in view
    Members.query(function (data) {
      $scope.members = data;
    });
  }
]);
