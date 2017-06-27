'use strict';

angular.module('audioFiles').controller('AudioFileListPublicController', ['$scope', '$filter', 'audioFilePublic',
  function ($scope, $filter, audioFilePublic) {
    console.log('audioFiles list initialized!!');
    //get the audioFiles list
    audioFilePublic.query(function (data) {
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
    //figure out items to display based on search filter
    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')($scope.audioFiles, {
        $: $scope.search
      });
      $scope.filterLength = $scope.filteredItems.length;
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;
      $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    };
    //readjust page when page is changed
    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };
  }  
]);
