// 'use strict'

const AuthCtrl = angular.module('coachApp.AuthCtrl',[])
.controller('AuthCtrl',($scope, $state, $window ,auth)=>{
   $scope.user = {};

   // Uses function in auth to check if user is logged in
   $scope.loggedIn = auth.currentUser();
   if($scope.loggedIn){
      $scope.title = "Logga ut";
   }
   else{
      $scope.title = "Logga in";
   }

   // Registration. $http request in auth-factory. If no errors happen, go to myPage.
   $scope.register = ()=>{
      auth.register($scope.user).error((error)=>{
         $scope.error = error;
      }).then(()=>{
         $window.location.reload(true);
         $state.go('nav.players');
      });
   };

   // Login. $http request in auth-factory. If succesful, go to myPage.
   $scope.logIn = ()=>{
      auth.logIn($scope.user).error((error)=>{
         $scope.error = error;
      }).then(()=>{
         $window.location.reload(true);
            $state.go('nav.players');
      });
   };

   $scope.goTo = ()=>{
      $state.go('nav.register');
   };

});

export default AuthCtrl;
