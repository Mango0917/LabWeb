'use strict';

//Remove and Update controller for Admin side
angular.module('publications.admin').controller('PublicationController', ['$scope', '$state', 'Authentication', 'publicationResolve',
  //Requires Admin role
  function ($scope, $state, Authentication, publicationResolve) {
    $scope.authentication = Authentication;
    $scope.publication = publicationResolve;
    
    //Remove publication
    $scope.remove = function (publication) {
      if (confirm('Are you sure you want to delete this publication?')) {
        if (publication) {
          publication.$remove();

          $scope.publications.splice($scope.publications.indexOf(publication), 1);
        } else {
          //redirect to publications list view
          $scope.publication.$remove(function () {
            $state.go('admin.publications');
          });
        }
      }
    };

    //Update Publication
    $scope.update = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'publicationForm');

        return false;
      }

      var publication = $scope.publication;

      //redirect to publications list view
      publication.$update(function () {
        $state.go('admin.publication', {
          publicationId: publication._id
        });
         //error handler
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);
