'use strict';

angular.module('events').controller('EventListPublicController', ['$scope', '$filter', 'eventsPublic',
  function ($scope, $filter, eventsPublic) {

    //will load all events
    eventsPublic.query(function (data) {
      $scope.events = data;

      //formats date
      for (var i = 0; i < $scope.events.length; i++) {
        $scope.events[i].created_at = $scope.events[i].created_at.slice(0,10);
      }
      //creates pagination of events
      $scope.buildPager();
    });

    //next three functions build pagination
    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')($scope.events, {
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
