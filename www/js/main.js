(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _login = require('./factories/login.js');

var _login2 = _interopRequireDefault(_login);

var _searches = require('./factories/searches.js');

var _searches2 = _interopRequireDefault(_searches);

var _authenticate = require('./login/authenticate.js');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _navigation = require('./nav/navigation.js');

var _navigation2 = _interopRequireDefault(_navigation);

var _players = require('./players/players.js');

var _players2 = _interopRequireDefault(_players);

var _games = require('./games/games.js');

var _games2 = _interopRequireDefault(_games);

var _practice = require('./practice/practice.js');

var _practice2 = _interopRequireDefault(_practice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 'coachApp' is the name of this angular module.
// the 2nd parameter is an array of imports
angular.module('coachApp', ['ionic', _login2.default.name, _searches2.default.name, _authenticate2.default.name, _navigation2.default.name, _players2.default.name, _games2.default.name, _practice2.default.name]).run(function ($ionicPlatform) {
   $ionicPlatform.ready(function () {
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
}).config(function ($stateProvider, $urlRouterProvider) {
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
   }).state('nav.register', {
      url: '/register',
      templateUrl: 'app/login/register.html',
      controller: 'AuthCtrl'
      //   views: {
      //     'content': {
      //       templateUrl: 'app/login/register.html',
      //       controller: 'AuthCtrl'
      //     }
      //   }
   }).state('nav.players', {
      url: '/players',
      templateUrl: 'app/players/players.html',
      controller: 'PlayersCtrl'
   }).state('nav.games', {
      url: '/games',
      templateUrl: 'app/games/games.html',
      controller: 'GamesCtrl'
   }).state('nav.practice', {
      url: '/practice',
      templateUrl: 'app/practice/practice.html',
      cache: false,
      controller: 'PracticeCtrl'
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
}); // Ionic Starter App


angular.bootstrap(document, ['coachApp']);

},{"./factories/login.js":2,"./factories/searches.js":3,"./games/games.js":4,"./login/authenticate.js":5,"./nav/navigation.js":6,"./players/players.js":7,"./practice/practice.js":8}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
var authFactory = angular.module('coachApp.auth', []).factory('auth', ['$http', '$window', function ($http, $window) {
   var auth = {};

   // After registration or login, function saves a user-token and a user in local-storage.
   auth.saveToken = function (data) {
      $window.localStorage['user-token'] = data.token;
      $window.localStorage.user = JSON.stringify(data.user);
   };

   // Returns the user-token. Used for checking for expiration time.
   auth.getToken = function () {
      return $window.localStorage['user-token'];
   };

   // Checks if a user is logged in and if the token has expired.
   auth.isLoggedIn = function () {
      var token = auth.getToken();
      if (token) {
         var payload = JSON.parse($window.atob(token.split('.')[1]));
         return payload.exp > Date.now() / 1000;
      } else {
         return false;
      }
   };

   // Returns current user. From user-object in local-storage.
   auth.currentUser = function () {
      if (auth.isLoggedIn()) {
         var isUser = JSON.parse($window.localStorage.user);
         return isUser;
      }
   };

   // Http-request for registration. User is object from registration form. Returns an object and a web-token. Saves those in saveToken-function.
   auth.register = function (user) {
      return $http.post('http://localhost:3000/api/authenticate/register', user).success(function (data) {
         auth.saveToken(data);
      });
   };

   // Http-request for registration. User is object from login form. Returns an object and a web-token. Saves those in saveToken-function.
   auth.logIn = function (user) {
      return $http.post('http://localhost:3000/api/authenticate/login', user).success(function (data) {
         auth.saveToken(data);
      });
   };

   // Removes user and user-token from local-storage.
   auth.logOut = function () {
      $window.localStorage.removeItem('user-token');
      $window.localStorage.removeItem('user');
   };

   return auth;
}]);

exports.default = authFactory;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
var searchFactory = angular.module('coachApp.search', []).factory('search', ['$http', '$window', function ($http, $window) {
   var search = {};

   search.getPlayers = function (user) {
      return $http.post('http://localhost:3000/api/players', user);
   };

   search.addPlayer = function (player) {
      return $http.put('http://localhost:3000/api/players', player);
   };

   search.removePlayer = function (player) {
      return $http.delete('http://localhost:3000/api/players/' + player._id);
   };

   search.getGames = function (user) {
      return $http.post('http://localhost:3000/api/games', user);
   };

   search.addGame = function (game) {
      return $http.put('http://localhost:3000/api/games', game);
   };

   search.removeGame = function (game) {
      return $http.delete('http://localhost:3000/api/games/' + game._id);
   };

   search.newTraining = function (players, username) {
      var obj = {
         players: players,
         username: username
      };
      return $http.put('http://localhost:3000/api/training', obj);
   };

   return search;
}]);

exports.default = searchFactory;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
var gamesCtrl = angular.module('coachApp.GamesCtrl', []).controller('GamesCtrl', function ($scope, $state, $window, auth, search, $ionicModal) {
   $scope.loggedIn = auth.currentUser();
   $scope.game = {};
   $scope.game.venue = "Hemma";

   if ($scope.loggedIn) {
      search.getGames($scope.loggedIn).success(function (response) {
         // console.log(response)
         $scope.allGames = response.games;
      });
   }

   $scope.addGame = function () {
      // $scope.allGames.push($scope.game);
      $scope.game.username = $scope.loggedIn.username;
      search.addGame($scope.game).success(function (response) {
         $scope.game = {};
         $window.location.reload(true);
      });
   };

   $scope.remove = function (game) {
      search.removeGame(game).success(function (response) {
         $scope.allGames.splice($scope.allGames.indexOf(game), 1);
      });
   };

   $ionicModal.fromTemplateUrl('/app/games/modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function (modal) {
      $scope.modal = modal;
   });
   $scope.openModal = function () {
      $scope.modal.show();
   };
   $scope.closeModal = function () {
      $scope.modal.hide();
   };
});

exports.default = gamesCtrl;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
// 'use strict'

var AuthCtrl = angular.module('coachApp.AuthCtrl', []).controller('AuthCtrl', function ($scope, $state, $window, auth) {
   $scope.user = {};

   // Uses function in auth to check if user is logged in
   $scope.loggedIn = auth.currentUser();
   if ($scope.loggedIn) {
      $scope.title = "Logga ut";
   } else {
      $scope.title = "Logga in";
   }

   // Registration. $http request in auth-factory. If no errors happen, go to myPage.
   $scope.register = function () {
      auth.register($scope.user).error(function (error) {
         $scope.error = error;
      }).then(function () {
         $window.location.reload(true);
         $state.go('nav.players');
      });
   };

   // Login. $http request in auth-factory. If succesful, go to myPage.
   $scope.logIn = function () {
      auth.logIn($scope.user).error(function (error) {
         $scope.error = error;
      }).then(function () {
         $window.location.reload(true);
         $state.go('nav.players');
      });
   };

   // Logout in auth-factory, clears local-storage. Then go to home.
   $scope.logOut = function () {
      auth.logOut();
      $window.location.reload(true);
      $state.go('nav.login');
   };

   $scope.goTo = function () {
      $state.go('nav.register');
   };
});

exports.default = AuthCtrl;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
var navCtrl = angular.module('coachApp.NavCtrl', []).controller('NavCtrl', function ($scope, $state, auth, $ionicSideMenuDelegate) {

   $scope.loggedIn = false;
   // // Uses function in auth to check if user is logged in
   $scope.user = auth.currentUser();
   if ($scope.user) {
      $scope.club = $scope.user.club;
      $scope.loggedIn = true;
   }
});

exports.default = navCtrl;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
var playersCtrl = angular.module('coachApp.PlayersCtrl', []).controller('PlayersCtrl', function ($scope, $state, $window, auth, search, $ionicModal) {
   $scope.loggedIn = auth.currentUser();
   $scope.player = {};
   if ($scope.loggedIn) {
      search.getPlayers($scope.loggedIn).success(function (response) {
         console.log(response);
         $scope.allPlayers = response.players;
      });
   }

   $scope.addPlayer = function () {
      $scope.player.username = $scope.loggedIn.username;
      search.addPlayer($scope.player).success(function (response) {
         $scope.player = {};
         $window.location.reload(true);
      });
   };

   $scope.remove = function (player) {
      search.removePlayer(player).success(function (response) {
         $scope.allPlayers.splice($scope.allPlayers.indexOf(player), 1);
      });
   };

   $ionicModal.fromTemplateUrl('/app/players/modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function (modal) {
      $scope.modal = modal;
   });
   $scope.openModal = function () {
      $scope.modal.show();
   };
   $scope.closeModal = function () {
      $scope.modal.hide();
   };
});

exports.default = playersCtrl;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
var practiceCtrl = angular.module('coachApp.PracticeCtrl', []).controller('PracticeCtrl', function ($scope, $state, auth, search, $ionicModal) {
   $scope.loggedIn = auth.currentUser();
   $scope.saved = false;
   if ($scope.loggedIn) {
      search.getPlayers($scope.loggedIn).success(function (response) {
         $scope.allPlayers = response.players;
         $scope.allPlayers.forEach(function (x) {
            x.training = 0;
         });
      });
   }

   $scope.savePractice = function () {
      $scope.allPlayers.forEach(function (x) {
         x.trainings.push(x.training);
         delete x.training;
      });
      search.newTraining($scope.allPlayers, $scope.loggedIn.username).success(function (response) {
         $scope.saved = true;
      });
   };
});

exports.default = practiceCtrl;

},{}]},{},[1])


//# sourceMappingURL=main.js.map
