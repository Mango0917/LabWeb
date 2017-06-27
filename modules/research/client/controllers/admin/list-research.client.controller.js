'use strict';

angular.module('research.admin').controller('ResearchListController', ['$scope', '$filter', 'researchAdmin',
  function ($scope, $filter, researchAdmin) {
    console.log('research list initialized!!');
    researchAdmin.query(function (data) {
      //populate resource
      $scope.researchs = data;
      //pagination
      $scope.buildPager();
    });
    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };
    
    //filter function
    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')($scope.researchs, {
        $: $scope.search
      });
      $scope.filterLength = $scope.filteredItems.length;
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;
      $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    };
    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };
  }
]);
