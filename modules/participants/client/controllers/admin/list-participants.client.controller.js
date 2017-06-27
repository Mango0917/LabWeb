'use strict';

angular.module('participants.admin').controller('ParticipantListController', ['$scope', '$filter', 'participantsAdmin',
  function ($scope, $filter, participantsAdmin) {
    console.log('participants list initialized!!');
    participantsAdmin.query(function (data) {
      $scope.participants = data;
      $scope.buildPager();
    });

    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };
    

    
    $scope.figureOutItemsToDisplay = function () {
      
      
      if($scope.search ==='')
        $scope.search = undefined;
      if($scope.search2 ==='')
        $scope.search2 = undefined;
      if($scope.search3 ==='')
        $scope.search3 = undefined;
      $scope.filteredItems = $filter('filter')($scope.participants, {
        $: $scope.search
      });
      
      if($scope.search2) //filter by experiment only if the field is filled. 
      {
        $scope.filteredItems = $filter('filter')($scope.filteredItems, {
          experiments : { experiment_name: $scope.search2 }
        });        
      }
      if($scope.search3) //filter by experiment only if the field is filled. 
      {
        $scope.filteredItems = $filter('filter')($scope.filteredItems, {
          experiments : { experiment_conditions: $scope.search3 }
        });        
      }
      
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
