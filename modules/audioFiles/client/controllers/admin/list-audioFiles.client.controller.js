'use strict';

angular.module('audioFiles.admin').controller('AudioFileListController', ['$scope', '$filter', 'audioFileAdmin',
  function ($scope, $filter, audioFileAdmin) {
    console.log('audioFiles list initialized!!');
    //get the admin Files to display
    audioFileAdmin.query(function (data) {
      $scope.audioFiles = data;
      $scope.buildPager();
    });
    //build the pager
    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };
    //figure out items to display based on search params
    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')($scope.audioFiles, {
        $: $scope.search
      });
      $scope.filterLength = $scope.filteredItems.length;
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;
      $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    };
    //if page is changed, adjust list items
    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };
  }
  
  
]);
