'use strict';

//Get controller for non-Admin
angular.module('publications').controller('PublicationListPublicController', ['$scope', '$filter', 'publicationsPublic',
  function ($scope, $filter, publicationsPublic) {
    console.log('publications list initialized!!');

    //Load input data
    publicationsPublic.query(function (data) {
      $scope.publications = data;
      $scope.buildPager();
    });
    
    //Set up display pages
    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    //Determine which items are on which page
    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')($scope.publications, {
        $: $scope.search
      });
      $scope.filterLength = $scope.filteredItems.length;
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;
      $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    };

    //Change page
    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };
  }
]);
