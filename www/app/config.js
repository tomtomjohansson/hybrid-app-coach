// Ionic Starter App
import authFactory from './factories/login.js';
import searchFactory from './factories/searches.js';
import authCtrl from './login/authenticate.js';
import navCtrl from './nav/navigation.js';
import playersCtrl from './players/players.js';
import gamesCtrl from './games/games.js';
import practiceCtrl from './practice/practice.js';

// 'coachApp' is the name of this angular module.
// the 2nd parameter is an array of imports
angular.module('coachApp', ['ionic',authFactory.name,searchFactory.name,authCtrl.name,navCtrl.name,playersCtrl.name,gamesCtrl.name,practiceCtrl.name])

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

.config(function($stateProvider, $urlRouterProvider) {
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
      //   views: {
      //     'content': {
      //       templateUrl: 'app/login/login.html',
      //       controller: 'AuthCtrl'
      //     }
      //   }
   })
   .state('nav.register', {
      url: '/register',
      templateUrl: 'app/login/register.html',
      controller: 'AuthCtrl'
      //   views: {
      //     'content': {
      //       templateUrl: 'app/login/register.html',
      //       controller: 'AuthCtrl'
      //     }
      //   }
   })
   .state('nav.players', {
      url: '/players',
      templateUrl: 'app/players/players.html',
      controller: 'PlayersCtrl',
   })
   .state('nav.games', {
      url: '/games',
      templateUrl: 'app/games/games.html',
      controller: 'GamesCtrl',
   })
   .state('nav.practice', {
      url: '/practice',
      templateUrl: 'app/practice/practice.html',
      cache:false,
      controller: 'PracticeCtrl',
   });
      //   views: {
      //     'content': {
      //       templateUrl: 'app/players/players.html',
      //       controller: 'PlayersCtrl'
      //     }
      //   }
   // .state('search.showbook', {
   //   url: '/books/:bookId',
   //   views: {
   //    'search-books': {
   //       templateUrl: 'templates/showbook.html',
   //       controller: 'bookCtrl'
   //    }
   //   }
   // })
   //
   // .state('search.about', {
   //   url: '/about',
   //   views: {
   //     'search-about': {
   //       templateUrl: 'templates/about.html'
   //     }
   //   }
   // });

   // if none of the above states are matched, use this as the fallback
   $urlRouterProvider.otherwise('nav/login');

});

angular.bootstrap(document,['coachApp']);
