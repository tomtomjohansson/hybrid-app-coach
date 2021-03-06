const playerStatsCtrl = angular.module('coachApp.PlayerStatsCtrl',[])
.controller('PlayerStatsCtrl',($scope, $state, auth, search, $stateParams)=>{
   $scope.loggedIn = auth.currentUser();
   $scope.id = $stateParams.playerID;
   $scope.isNumber = angular.isNumber;
   $scope.flipped = false;
   $scope.noGames = false;

   // Gets player stats (games) from database. Calls factory.
   search.getPlayerStats($scope.id).success((response)=>{
      $scope.player = response.player[0];
      console.log(response.player.length);
      if(response.player.length === 0){
         $scope.noGames = true;
      }
   });

   // Gets player stats (trainings) from database. Calls factory.
   search.getTrainingStats($scope.id).success((response)=>{
      $scope.trainer = response.trainer[0];
   });


});

export default playerStatsCtrl;
