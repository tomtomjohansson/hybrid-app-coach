const navCtrl = angular.module('coachApp.NavCtrl',[])
.controller('NavCtrl',($scope, $state ,auth,$ionicSideMenuDelegate)=>{

   $scope.loggedIn = false;
   // // Uses function in auth to check if user is logged in
   $scope.user = auth.currentUser();
   if($scope.user){
      $scope.club = $scope.user.club;
      $scope.loggedIn = true;
   }
});

export default navCtrl;
