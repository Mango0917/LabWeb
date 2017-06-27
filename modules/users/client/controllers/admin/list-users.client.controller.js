'use strict';

angular.module('users.admin').controller('UserListController', ['$scope', '$filter', 'Admin',
  function ($scope, $filter, Admin) {
    
    // Obtain data from API via factory
    Admin.query(function (data) { 
      $scope.users = data;
      $scope.buildPager();
    });

    // Construct pages
    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    // Decide what to display
    $scope.figureOutItemsToDisplay = function () {
      // Filter based on search
      $scope.filteredItems = $filter('filter')($scope.users, {
        $: $scope.search
      });

      // Store total number of items that need to be displayed 
      $scope.filterLength = $scope.filteredItems.length;

      // Choose indices 
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;

      // Populate page based on filter and indices
      $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    };

    // Decide what to display when page changes
    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };
  }
]);
