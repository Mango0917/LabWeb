'use strict';

angular.module('experiments.admin').controller('ExperimentListController', ['$scope', '$filter', 'experimentsAdmin',
  function ($scope, $filter, experimentsAdmin) {
    console.log('experiments list initialized!');
    experimentsAdmin.query(function (data) {
      $scope.experiments = data;
      $scope.buildPager();
    });

    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    
    /* EDIT THE FOLLOWING TO ADD EVEN MORE FILTER CONTROL */
    $scope.figureOutItemsToDisplay = function () {
      
      /* for some reason, the third search parameter was not resetting the list on empty. */
      if($scope.search3 ==='')
        $scope.search3 = undefined;
      //Filter by both name and coniditions
      $scope.filteredItems = $filter('filter')($scope.experiments, {
        $: $scope.search,
        experiment_conditions: $scope.search3,
        experiment_name: $scope.search2
        
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
