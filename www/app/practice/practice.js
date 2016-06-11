const practiceCtrl = angular.module('coachApp.PracticeCtrl',[])
.controller('PracticeCtrl',($scope, $state, auth, search,$ionicPopup)=>{
   $scope.loggedIn = auth.currentUser();
   if($scope.loggedIn){
      search.getPlayers($scope.loggedIn).success((response)=>{
         $scope.allPlayers = response.players;
         $scope.allPlayers.forEach((x)=>{
            x.training = 0;
         });
      });
   }

   $scope.savePractice = ()=>{
      $scope.allPlayers.forEach((x)=>{
         x.trainings.push(x.training);
         delete x.training;
      });
      search.newTraining($scope.allPlayers,$scope.loggedIn.username).success((response)=>{
         $scope.showAlert();
      });
   };

   // An alert dialog
   $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
         title: 'Träningen har sparats.',
         template: 'Bra jobbat!',
         buttons: [
            {
               text: 'Ok',
               type: 'button-royal'
            }
         ]
      });

      alertPopup.then(function(res) {
         console.log('Popup closed');
      });
   };


});

export default practiceCtrl;
