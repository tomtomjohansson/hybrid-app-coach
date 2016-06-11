const navCtrl = angular.module('coachApp.NavCtrl',[])
.controller('NavCtrl',($scope, $state, $window, auth)=>{
   $scope.loggedIn = false;
   // // Uses function in auth to check if user is logged in
   if(auth.isLoggedIn()){
      $scope.user = auth.currentUser();
      $scope.username = $scope.user.username;
   }
   if($scope.user){
      $scope.club = $scope.user.club;
      $scope.loggedIn = true;
   }

   // Logout in auth-factory, clears local-storage. Then go to home.
   $scope.logOut = ()=>{
      auth.logOut();
      $window.location.reload(true);
      $state.go('nav.login');
   };

});

export default navCtrl;
