'use strict';

const loadFactory = angular.module('coachApp.load', [])
.factory('load', ['$ionicLoading', ($ionicLoading)=>{
   let load = {};

   load.show = function() {
      $ionicLoading.show({
         template: '<ion-spinner></ion-spinner>'
      }).then(function(){
         console.log("The loading indicator is now displayed");
      });
   };
   load.hide = function(){
      $ionicLoading.hide().then(function(){
         console.log("The loading indicator is now hidden");
      });
   };

   return load;
}]);

export default loadFactory;
