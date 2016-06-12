const teamStatsCtrl = angular.module('coachApp.TeamStatsCtrl',[])
.controller('TeamStatsCtrl',($scope, $state, auth, search)=>{
   $scope.loggedIn = auth.currentUser();
   $scope.isNumber = angular.isNumber;
   $scope.flipped = false;
   $scope.noGames = false;

   search.getTeamStats($scope.loggedIn.username).success((response)=>{
      $scope.team = response.team[0];
      console.log(response.team.length);
      console.log(response.team[0]);
      if(response.team.length === 0){
         $scope.noGames = true;
      }
   });



});

export default teamStatsCtrl;
