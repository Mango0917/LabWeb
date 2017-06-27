'use strict';

//Read controller for Admin side
angular.module('publications.admin').controller('PublicationListController', ['$scope', '$filter', 'publicationsAdmin',
  function ($scope, $filter, publicationsAdmin) {
    console.log('publications list initialized!');

    //Load input data
    publicationsAdmin.query(function (data) {
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

    //Change pages
    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };
  }
]);
