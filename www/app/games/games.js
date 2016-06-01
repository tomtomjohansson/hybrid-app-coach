const gamesCtrl = angular.module('coachApp.GamesCtrl',[])
.controller('GamesCtrl',($scope, $state, $window, auth, search, $ionicModal)=>{
   $scope.loggedIn = auth.currentUser();
   $scope.game = {};
   $scope.game.venue = "Hemma";

   if($scope.loggedIn){
      search.getGames($scope.loggedIn).success((response)=>{
         // console.log(response)
         $scope.allGames = response.games;
      });
   }

   $scope.addGame = ()=>{
      // $scope.allGames.push($scope.game);
      $scope.game.username = $scope.loggedIn.username;
      search.addGame($scope.game).success((response)=>{
         $scope.game = {};
         $window.location.reload(true);
      });
   };

   $scope.remove = (game)=>{
      search.removeGame(game).success((response)=>{
         $scope.allGames.splice($scope.allGames.indexOf(game),1);
      });
   };

   $ionicModal.fromTemplateUrl('/app/games/modal.html', {
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

export default gamesCtrl;
