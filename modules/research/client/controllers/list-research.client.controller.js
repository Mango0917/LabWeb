'use strict';

angular.module('research').controller('ResearchListPublicController', ['$scope', '$filter', 'researchPublic',
  function ($scope, $filter, researchPublic) {
    console.log('research list initialized!!');
    researchPublic.query(function (data) {
      $scope.researchs = data;
      
      //re order data by time posted
      for (var i = 0; i < $scope.researchs.length; i++) {
        $scope.researchs[i].created_at = $scope.researchs[i].created_at.slice(0,10);
      }

      $scope.buildPager();
    });

    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

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
