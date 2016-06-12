const gameStatsCtrl = angular.module('coachApp.GameStatsCtrl',[])
.controller('GameStatsCtrl',($scope, $state, $window, auth, search, $stateParams,$ionicModal)=>{
   $scope.loggedIn = auth.currentUser();
   $scope.id = $stateParams.gameID;
   $scope.change = {};
   $scope.assist = false;

   // Calls factory. Gets stats for game from database. Sets it to game-variable in scope.
   search.getGameStats($scope.id).success((response)=>{
      $scope.game = response.game;
      // if($scope.game.ended){
      //    $state.go('nav.after',{gameID:$scope.game._id});
      // }
   });

   // Sets starting eleven. Calls factory. Players in starting eleven gets minutes.out set to 90. On success goes to page for adding stats.
   $scope.setEleven = () =>{
      search.updateGameStats($scope.game).success((response)=>{
         console.log('Startelva bifogad');
         $state.go('nav.stats',{gameID:$scope.game._id});
      });
   };

   // When event occurs, stat to be added, sets which event. Used for layout in modal.
   $scope.setEvent = ()=>{
      console.log($scope.change.stats[0]);
      switch($scope.change.stats[0]){
         case "goals":
            $scope.assist = true;
            $scope.event = "Målskytt:";
            break;
         case "shots":
            $scope.assist = false;
            $scope.event = "Avslutare:";
            break;
         case "yellow":
            $scope.assist = false;
            $scope.event = "Gult kort till:";
            break;
         case "red":
            $scope.assist = false;
            $scope.event = "Rött kort till:";
            break;
      }
   };

   // Updates stats.
   $scope.updateGameStats = ()=>{
      console.log($scope.assist);
      // Variable stats is stat to be changed. (Example ['goals','for'])
      let stats = $scope.change.stats;
      // Adds to the stat to be changed.
      $scope.game[stats[0]][stats[1]] += 1;
      // If a goal has been scored by user-team. Adds a shot and a goal for selected player. Adds assist to player that assisted. Also adds shot to total shots in game.
      if(stats[1] === "for" && stats[0] === "goals"){
         $scope.closeModal(1);
         let playerIndex = $scope.game.players.findIndex((x)=>{
            return x._id === $scope.change.id;
         });
         let playerIndex2 = $scope.game.players.findIndex((x)=>{
            return x._id === $scope.change.assist;
         });
         $scope.game.players[playerIndex].goals += 1;
         $scope.game.players[playerIndex].shots += 1;
         $scope.game.players[playerIndex2].assists += 1;
         $scope.game.shots.for += 1;
         $scope.assist = false;
      }
      // Event for that is not goal or corner. Adds plus one to stat for selected player.
      else if(stats[1] === "for" && stats[0] !== "goals" && stats[0] !== "corners"){
         $scope.closeModal(1);
         let playerIndex = $scope.game.players.findIndex((x)=>{
            return x._id === $scope.change.id;
         });
         $scope.game.players[playerIndex][stats[0]] += 1;
      }
      // If goal against. Also add one to total shots in game for opponent.
      else if(stats[1] === "against" && stats[0] === "goals"){
         $scope.closeModal(1);
         $scope.game.shots.against += 1;
      }
      // Calls factory. Sends the game object to database and updates.
      search.updateGameStats($scope.game).success((response)=>{
         console.log('Spelsituation bifogad');
      });
   };

   // Makes substitution. Finds player to be replaced and sets minutes.out to the minute of the substitution. Finds player to come on and sets minutes.in to minute of substitution. Sets time out to 90 to ensure the player is visible for selection i stats-modal.
   $scope.sub = {};
   $scope.makeSub = ()=>{
      $scope.closeModal(2);
      let subInIndex = $scope.game.players.findIndex((x)=>{
         return x._id === $scope.sub.in;
      });
      let subOutIndex = $scope.game.players.findIndex((x)=>{
         return x._id === $scope.sub.out;
      });
      $scope.game.players[subInIndex].minutes.in = $scope.sub.time;
      $scope.game.players[subInIndex].minutes.out = 90;
      $scope.game.players[subOutIndex].minutes.out = $scope.sub.time;
      // Calls factory. Sends the game object to database and updates.
      search.updateGameStats($scope.game).success((response)=>{
         console.log('Byte genomfört');
         $window.location.reload(true);
      });
   };

   // After the game gives plus one to player.bonus if player has performed well.
   $scope.giveBonus = () =>{
      $scope.closeModal(3);
      // Calls factory. Sends the game object to database and updates.
      search.updateGameStats($scope.game).success((response)=>{
         console.log('Delade ut pluspoäng');
      });
   };

   // At the end of the game saves it as finalized. Also calculates how many minutes players have played and adds it to the players.minutes.total.
   $scope.saveGameOnEnd = () =>{
      $scope.game.players.forEach((x)=>{
         x.minutes.total = x.minutes.out - x.minutes.in;
      });
      $scope.game.ended = true;
      // Calls factory. Sends the game object to database and updates.
      search.updateGameStats($scope.game).success((response)=>{
         console.log('Totalt antal minuter tillagt');
         console.log($scope.game._id);
         $state.go('nav.after',{gameID:$scope.game._id});
      });
   };

   // Filters for which players to display in various modals.
   // True if player is currently on the pitch?
   $scope.isNinety = (player)=>{
      if( player.minutes.out === 90) {
          return true;
      }
      else {
          return false;
      }
  };
  // True if player is not currently on the pitch.
  $scope.notNinety = (player)=>{
     if( player.minutes.out !== 90) {
         return true;
     }
     else {
         return false;
      }
   };
   // True if player did not play at all.
   $scope.playerOnBench = (player)=>{
      if( player.minutes.out === 0) {
          return true;
      }
      else {
          return false;
       }
    };
   //  True if player participated in the game.
   $scope.hasPlayed = (player)=>{
      if( player.minutes.out > 0) {
          return true;
      }
      else {
          return false;
       }
    };



   // Modal provided by Ionic.
   // Id 1 - modal for adding stats.
   // Id 2 - modal for making substitutions.
   // Id 2 - modal for handing out bonuspoints to players.
   $ionicModal.fromTemplateUrl('/app/gameStats/modal.html', {
      id: '1',
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) {
      $scope.modal1 = modal;
   });
   $ionicModal.fromTemplateUrl('/app/gameStats/modalsub.html', {
      id: '2',
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) {
      $scope.modal2 = modal;
   });
   $ionicModal.fromTemplateUrl('/app/gameStats/modalbonus.html', {
      id: '3',
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) {
      $scope.modal3 = modal;
   });
   $scope.openModal = function(id) {
      if(id === 1){
         $scope.modal1.show();
      }
      else if(id === 2){
         $scope.modal2.show();
      }
      else{
         $scope.modal3.show();
      }
   };
   $scope.closeModal = function(id) {
      if(id === 1){
         $scope.modal1.hide();
      }
      else if(id === 2){
         $scope.modal2.hide();
      }
      else{
         $scope.modal3.hide();
      }
   };

});

export default gameStatsCtrl;
