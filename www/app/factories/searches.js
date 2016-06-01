'use strict';

const searchFactory = angular.module('coachApp.search', [])
.factory('search', ['$http', '$window', ($http, $window)=>{
   let search = {};

   search.getPlayers = (user)=>{
      return $http.post('http://localhost:3000/api/players',user);
   };

   search.addPlayer = (player)=>{
      return $http.put('http://localhost:3000/api/players',player);
   };

   search.removePlayer = (player)=>{
      return $http.delete('http://localhost:3000/api/players/'+player._id);
   };

   search.getGames = (user)=>{
      return $http.post('http://localhost:3000/api/games',user);
   };

   search.addGame = (game)=>{
      return $http.put('http://localhost:3000/api/games',game);
   };

   search.removeGame = (game)=>{
      return $http.delete('http://localhost:3000/api/games/'+game._id);
   };

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
