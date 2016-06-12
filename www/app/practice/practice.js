const practiceCtrl = angular.module('coachApp.PracticeCtrl',[])
.controller('PracticeCtrl',($scope, $state, auth, search,$ionicPopup)=>{
   $scope.loggedIn = auth.currentUser();

   // Gets all the players. Calls factory. Creates and adds temporary key to player-objects.
   if($scope.loggedIn){
      search.getPlayers($scope.loggedIn).success((response)=>{
         $scope.allPlayers = response.players;
         $scope.allPlayers.forEach((x)=>{
            x.training = 0;
         });
      });
   }

   // Saves practice. Pushes 1 or 0 to array in player-subdocument. Deletes temporary key and saves to database. Calls factory.
   $scope.savePractice = ()=>{
      $scope.allPlayers.forEach((x)=>{
         x.trainings.push(x.training);
         delete x.training;
      });
      search.newTraining($scope.allPlayers,$scope.loggedIn.username).success((response)=>{
         $scope.showAlert();
      });
   };

   // An alert dialog. Provided by Ionic.
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
