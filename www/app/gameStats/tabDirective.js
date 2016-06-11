'use strict';

const tabDir = angular.module('coachApp.tabDir',[])
.directive('tabsForGame',()=>{
   return {
      templateUrl: 'app/gameStats/tab.html',
      controller: 'GameStatsCtrl'
   };
});

export default tabDir;
