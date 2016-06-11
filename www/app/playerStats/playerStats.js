const playerStatsCtrl = angular.module('coachApp.PlayerStatsCtrl',[])
.controller('PlayerStatsCtrl',($scope, $state, auth, search, $stateParams)=>{
   $scope.loggedIn = auth.currentUser();
   $scope.id = $stateParams.playerID;
   $scope.isNumber = angular.isNumber;
   $scope.flipped = false;

   search.getPlayerStats($scope.id).success((response)=>{
      $scope.player = response.player[0];
   });

   search.getTrainingStats($scope.id).success((response)=>{
      $scope.trainer = response.trainer[0];
   });


});

export default playerStatsCtrl;
