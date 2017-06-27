'use strict';


angular.module('audioFiles.admin').controller('AudioFileController', ['$sce', '$http', '$scope', '$state', 'Authentication', 'audioFileResolve',
  function ($sce, $http, $scope, $state, Authentication, audioFileResolve) {
    $scope.authentication = Authentication;
    //get current audioFile using resolve
    $scope.audioFile = audioFileResolve;
    //remove the audioFile from the database and the list
    $scope.remove = function (audioFile) {
      if (confirm('Are you sure you want to delete this audioFile?')) {
        if (audioFile) {
          audioFile.$remove();
          $scope.audioFiles.splice($scope.audioFiles.indexOf(audioFile), 1);
        } else {
          $scope.audioFile.$remove(function () {
            $state.go('admin.audioFiles');
          });
        }
      }
    };
    //read the audio File fro the server by using the audioFile's path
    $scope.readFile = function(){
      var audioFile = $scope.audioFile;
      audioFile.$promise.then(function(response){
        console.log(response);
        //request to retreive audio data
        $http.post('/api/audioFiles/mp3', response).success(function (response) {
          console.log('SUCCESS mp3 http post');
          //set audio src
          $scope.mp3URL = $sce.trustAsResourceUrl(response);
        }).error(function (response) {
          console.log('FAILED TO htpp post');
          $scope.error = response.message;
        });
      });
    };
  }
]);


