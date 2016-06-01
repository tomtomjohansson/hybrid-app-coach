'use strict';

const authFactory = angular.module('coachApp.auth', [])
.factory('auth', ['$http', '$window', ($http, $window)=>{
   let auth = {};

   // After registration or login, function saves a user-token and a user in local-storage.
   auth.saveToken = (data) =>{
      $window.localStorage['user-token'] = data.token;
      $window.localStorage.user = JSON.stringify(data.user);
   };

   // Returns the user-token. Used for checking for expiration time.
   auth.getToken = ()=>$window.localStorage['user-token'];

   // Checks if a user is logged in and if the token has expired.
   auth.isLoggedIn = ()=>{
      let token = auth.getToken();
      if(token){
         let payload = JSON.parse($window.atob(token.split('.')[1]));
         return payload.exp > Date.now() / 1000;
      }
      else{
         return false;
      }
   };

   // Returns current user. From user-object in local-storage.
   auth.currentUser = ()=>{
      if(auth.isLoggedIn()){
         let isUser = JSON.parse($window.localStorage.user);
         return isUser;
      }
   };

   // Http-request for registration. User is object from registration form. Returns an object and a web-token. Saves those in saveToken-function.
   auth.register = user=>{
      return $http.post('http://localhost:3000/api/authenticate/register', user).success((data)=>{
         auth.saveToken(data);
      });
   };

   // Http-request for registration. User is object from login form. Returns an object and a web-token. Saves those in saveToken-function.
   auth.logIn = user=>{
      return $http.post('http://localhost:3000/api/authenticate/login', user).success((data)=>{
         auth.saveToken(data);
      });
   };

   // Removes user and user-token from local-storage.
   auth.logOut = ()=>{
      $window.localStorage.removeItem('user-token');
      $window.localStorage.removeItem('user');
   };

   return auth;
}]);

export default authFactory;
