const playersCtrl = angular.module('coachApp.PlayersCtrl',[])
.controller('PlayersCtrl',($scope, $state, $window, auth, search,$ionicModal)=>{
   $scope.loggedIn = auth.currentUser();
   $scope.player = {};
   if($scope.loggedIn){
      search.getPlayers($scope.loggedIn).success((response)=>{
         console.log(response);
         $scope.allPlayers = response.players;
      });
   }

   $scope.addPlayer = ()=>{
      $scope.player.username = $scope.loggedIn.username;
      search.addPlayer($scope.player).success((response)=>{
         $scope.modal.hide();
         $scope.player = {};
         $window.location.reload(true);
      });
   };

   $scope.remove = (player)=>{
      search.removePlayer(player).success((response)=>{
         $scope.allPlayers.splice($scope.allPlayers.indexOf(player),1);
      });
   };


   $ionicModal.fromTemplateUrl('/app/players/modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) {
      $scope.modal = modal;
   });
   $scope.openModal = function() {
      $scope.modal.show();
   };
   $scope.closeModal = function() {
      $scope.modal.hide();
   };
});

export default playersCtrl;
