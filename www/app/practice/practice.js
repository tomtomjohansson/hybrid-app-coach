const practiceCtrl = angular.module('coachApp.PracticeCtrl',[])
.controller('PracticeCtrl',($scope, $state, auth, search,$ionicModal)=>{
   $scope.loggedIn = auth.currentUser();
   $scope.saved = false;
   if($scope.loggedIn){
      search.getPlayers($scope.loggedIn).success((response)=>{
         $scope.allPlayers = response.players;
         $scope.allPlayers.forEach((x)=>{
            x.training = 0;
         });
      });
   }

   $scope.savePractice = ()=>{
      $scope.allPlayers.forEach((x)=>{
         x.trainings.push(x.training);
         delete x.training;
      });
      search.newTraining($scope.allPlayers,$scope.loggedIn.username).success((response)=>{
         $scope.saved = true;
      });
   };


});

export default practiceCtrl;
