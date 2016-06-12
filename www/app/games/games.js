const gamesCtrl = angular.module('coachApp.GamesCtrl',[])
.controller('GamesCtrl',($scope, $state, $window, auth, search, $ionicModal)=>{
   $scope.loggedIn = auth.currentUser();
   $scope.game = {};
   $scope.game.venue = "Hemma";

   // Calls factory. Gets all the games from database.
   search.getGames().success((response)=>{
      $scope.allGames = response.games;
   });

   // Calls factory. Adds a game to database. On success empties object and reloads.
   $scope.addGame = ()=>{
      $scope.game.username = $scope.loggedIn.username;
      search.addGame($scope.game).success((response)=>{
         $scope.game = {};
         $window.location.reload(true);
      });
   };

   // Calls factory. Removes game from database. Removes game from app if success.
   $scope.remove = (game)=>{
      search.removeGame(game).success((response)=>{
         $scope.allGames.splice($scope.allGames.indexOf(game),1);
      });
   };

   // Ionic provides modal.
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
