// Ionic Starter App
import authFactory from './factories/login.js';
import searchFactory from './factories/searches.js';
import loadFactory from './factories/loading.js';
import authCtrl from './login/authenticate.js';
import navCtrl from './nav/navigation.js';
import playersCtrl from './players/players.js';
import playerStatsCtrl from './playerStats/playerStats.js';
import teamStatsCtrl from './teamStats/teamStats.js';
import gamesCtrl from './games/games.js';
import gameStatsCtrl from './gameStats/gameStats.js';
import practiceCtrl from './practice/practice.js';
import tabDir from './gameStats/tabDirective.js';

// 'coachApp' is the name of this angular module.
// the 2nd parameter is an array of imports
angular.module('coachApp', ['ionic',authFactory.name,searchFactory.name,loadFactory.name,authCtrl.name,navCtrl.name,playersCtrl.name,playerStatsCtrl.name,teamStatsCtrl.name,gamesCtrl.name,gameStatsCtrl.name,practiceCtrl.name,tabDir.name])

.run(function($ionicPlatform) {
   $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
         cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
         cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
         // org.apache.cordova.statusbar required
         StatusBar.styleDefault();
      }
   });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

   $ionicConfigProvider.backButton.previousTitleText(false);
   $ionicConfigProvider.backButton.text('');
   $ionicConfigProvider.views.forwardCache(true);
   $ionicConfigProvider.tabs.position('bottom');
   $ionicConfigProvider.navBar.alignTitle('center');

   $stateProvider
   // setup an abstract state for the tabs directive
   .state('nav', {
      url: '/nav',
      abstract: true,
      templateUrl: 'app/nav/navigation.html',
      controller: 'NavCtrl'
   })
   // Each tab has its own nav history stack:
   .state('nav.login', {
      url: '/login',
      templateUrl: 'app/login/login.html',
      controller: 'AuthCtrl'
   })
   .state('nav.register', {
      url: '/register',
      templateUrl: 'app/login/register.html',
      controller: 'AuthCtrl'
   })
   .state('nav.players', {
      url: '/players',
      templateUrl: 'app/players/players.html',
      controller: 'PlayersCtrl',
   })
   .state('nav.player', {
      url: '/players/:playerID',
      templateUrl: 'app/playerStats/playerStats.html',
      controller: 'PlayerStatsCtrl',
      cache:false
   })
   .state('nav.team', {
      url: '/team',
      templateUrl: 'app/teamStats/teamStats.html',
      controller: 'TeamStatsCtrl',
      cache:false
   })
   .state('nav.games', {
      url: '/games/:id',
      templateUrl: 'app/games/games.html',
      controller: 'GamesCtrl',
   })
   .state('nav.pre', {
      url: '/pre/:gameID',
      templateUrl: 'app/gameStats/preGame.html',
      controller: 'GameStatsCtrl',
      cache:false
   })
   .state('nav.after', {
      url: '/after/:gameID',
      templateUrl: 'app/gameStats/afterGame.html',
      controller: 'GameStatsCtrl',
      cache:false
   })
   .state('nav.stats', {
      url: '/stats/:gameID',
      templateUrl: 'app/gameStats/gameStats.html',
      controller: 'GameStatsCtrl',
      cache:false
   })
   .state('nav.practice', {
      url: '/practice',
      templateUrl: 'app/practice/practice.html',
      cache:false,
      controller: 'PracticeCtrl',
   });

   // if none of the above states are matched, use this as the fallback
   $urlRouterProvider.otherwise('nav/login');

});

angular.bootstrap(document,['coachApp']);
