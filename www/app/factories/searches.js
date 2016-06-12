'use strict';

const searchFactory = angular.module('coachApp.search', [])
.factory('search', ['$http', '$window', ($http, $window)=>{
   let search = {};

   // Gets user that is logged in. Object.
   let currentUser = JSON.parse($window.localStorage.user);

   // Gets all the players. Parameter is logged in user.
   search.getPlayers = (user)=>{
      return $http.post('http://localhost:3000/api/players',user);
   };

   // Adds player to database. Parameter is object of player to be added.
   search.addPlayer = (player)=>{
      return $http.put('http://localhost:3000/api/players',player);
   };

   // Removes player from database. Parameter is object of player to be deleted.
   search.removePlayer = (player)=>{
      return $http.delete('http://localhost:3000/api/players/'+player._id+"/"+currentUser.username);
   };

   // Gets playerstats (matches) for playerpages. Parameter is $stateParams.
   search.getPlayerStats = (id)=>{
      return $http.get('http://localhost:3000/api/playerStats/'+id);
   };

   // Gets playerstats (training) for playerpages. Parameter is $stateParams.
   search.getTrainingStats = (id)=>{
      return $http.get('http://localhost:3000/api/trainerStats/'+id);
   };

   // Gets playerstats (training) for playerpages. Parameter is $stateParams.
   search.getTeamStats = (username)=>{
      return $http.get('http://localhost:3000/api/teamStats/'+username);
   };

   // Gets all the games from the logged in user.
   search.getGames = ()=>{
      return $http.get('http://localhost:3000/api/games/'+currentUser.username);
   };

   // Gets all the stats for game. Parameter is $stateParams.
   search.getGameStats = (id)=>{
      return $http.get('http://localhost:3000/api/gameStats/'+id);
   };

   // Updates a game. Parameter is entire ojbect of game.
   search.updateGameStats = (game)=>{
      return $http.put('http://localhost:3000/api/gameStats/',game);
   };

   // Adds a new game. Parameter is game to be added.
   search.addGame = (game)=>{
      return $http.put('http://localhost:3000/api/games',game);
   };

   // Deletes a game. Parameter is game to be deleted.
   search.removeGame = (game)=>{
      return $http.delete('http://localhost:3000/api/games/'+game._id+"/"+currentUser.username);
   };

   // Adds a trainingsession. Players is object of all players and attendance-info.
   search.newTraining = (players,username)=>{
      let obj = {
         players:players,
         username:username
      };
      return $http.put('http://localhost:3000/api/training',obj);
   };

   return search;
}]);

export default searchFactory;
