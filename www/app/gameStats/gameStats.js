const gameStatsCtrl = angular.module('coachApp.GameStatsCtrl',[])
.controller('GameStatsCtrl',($scope, $state, $window, auth, search, $stateParams,$ionicModal)=>{
   $scope.loggedIn = auth.currentUser();
   $scope.id = $stateParams.gameID;
   $scope.change = {};
   $scope.assist = false;

   search.getGameStats($scope.id).success((response)=>{
      $scope.game = response.game;
   });

   $scope.updateGameStats = ()=>{
      console.log($scope.assist);
      let stats = $scope.change.stats;
      $scope.game[stats[0]][stats[1]] += 1;
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
      else if(stats[1] === "for" && stats[0] !== "goals" && stats[0] !== "corners"){
         $scope.closeModal(1);
         let playerIndex = $scope.game.players.findIndex((x)=>{
            return x._id === $scope.change.id;
         });
         $scope.game.players[playerIndex][stats[0]] += 1;
      }
      else if(stats[1] === "against" && stats[0] === "goals"){
         $scope.closeModal(1);
         $scope.game.shots.against += 1;
      }
      search.updateGameStats($scope.game).success((response)=>{
         console.log('Spelsituation bifogad');
      });
   };

   $scope.setEleven = () =>{
      search.updateGameStats($scope.game).success((response)=>{
         console.log('Startelva bifogad');
         $state.go('nav.stats',{gameID:$scope.game._id});
      });
   };

   $scope.saveGameOnEnd = () =>{
      $scope.game.players.forEach((x)=>{
         x.minutes.total = x.minutes.out - x.minutes.in;
      });
      search.updateGameStats($scope.game).success((response)=>{
         console.log('Totalt antal minuter tillagt');
         console.log($scope.game._id);
         $state.go('nav.after',{gameID:$scope.game._id});
      });
   };

   $scope.giveBonus = () =>{
      $scope.closeModal(3);
      search.updateGameStats($scope.game).success((response)=>{
         console.log('Delade ut pluspoäng');
      });
   };

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
      search.updateGameStats($scope.game).success((response)=>{
         console.log('Byte genomfört');
         $window.location.reload(true);
      });
   };

   $scope.isNinety = (player)=>{
      if( player.minutes.out === 90) {
          return true;
      }
      else {
          return false;
      }
  };
  $scope.notNinety = (player)=>{
     if( player.minutes.out !== 90) {
         return true;
     }
     else {
         return false;
      }
   };
   $scope.playerOnBench = (player)=>{
      if( player.minutes.out === 0) {
          return true;
      }
      else {
          return false;
       }
    };
   $scope.hasPlayed = (player)=>{
      if( player.minutes.out > 0) {
          return true;
      }
      else {
          return false;
       }
    };

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
