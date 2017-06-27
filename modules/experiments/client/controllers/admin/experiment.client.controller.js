'use strict';

angular.module('experiments.admin').controller('ExperimentController', ['$scope', '$state', 'Authentication', 'experimentResolve',
  function ($scope, $state, Authentication, experimentResolve, Admin) {
    $scope.authentication = Authentication;
    $scope.localConditions = [];
    $scope.edit_conditions = false;
    $scope.experiment = experimentResolve;     
     /* handle updating the list of conditions per experiemnt */
     /* Handle coniditions locally before saving to DB*/
    $scope.new_condition_to_add = '';
    $scope.resetLocalConditions = function() {     
      $scope.edit_conditions = true;
      $scope.localConditions = angular.copy($scope.experiment.experiment_conditions);
    };
    
    $scope.addLocalCondition = function() {
      if($scope.new_condition_to_add !== '')
      {
        if($scope.localConditions.indexOf($scope.new_condition_to_add) === -1)
        {
          $scope.localConditions.push($scope.new_condition_to_add);
        }
      }  
      $scope.new_condition_to_add = '';
    };

    $scope.deleteLocalCondition = function(index) {
      $scope.localConditions.splice(index, 1);
    };

    $scope.remove = function (experiment) {
      if (confirm('Are you sure you want to delete this experiment?')) {
        if (experiment) {
          experiment.$remove();

          $scope.experiments.splice($scope.experiments.indexOf(experiment), 1);
        } else {
          $scope.experiment.$remove(function () {
            $state.go('admin.experiments');
          });
        }
      }
    };

    $scope.update = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'experimentForm');

        return false;
      }
      
      /* Set the conditions array */
      $scope.experiment.experiment_conditions = angular.copy($scope.localConditions);
      var experiment = $scope.experiment;

      experiment.$update(function () {
        $state.go('admin.experiment', {
          experimentId: experiment._id
        });
        $state.go('admin.experiments');
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    
    
  }
]);
