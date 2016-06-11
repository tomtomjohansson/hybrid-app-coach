(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _login = require('./factories/login.js');

var _login2 = _interopRequireDefault(_login);

var _searches = require('./factories/searches.js');

var _searches2 = _interopRequireDefault(_searches);

var _loading = require('./factories/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _authenticate = require('./login/authenticate.js');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _navigation = require('./nav/navigation.js');

var _navigation2 = _interopRequireDefault(_navigation);

var _players = require('./players/players.js');

var _players2 = _interopRequireDefault(_players);

var _playerStats = require('./playerStats/playerStats.js');

var _playerStats2 = _interopRequireDefault(_playerStats);

var _games = require('./games/games.js');

var _games2 = _interopRequireDefault(_games);

var _gameStats = require('./gameStats/gameStats.js');

var _gameStats2 = _interopRequireDefault(_gameStats);

var _practice = require('./practice/practice.js');

var _practice2 = _interopRequireDefault(_practice);

var _tabDirective = require('./gameStats/tabDirective.js');

var _tabDirective2 = _interopRequireDefault(_tabDirective);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 'coachApp' is the name of this angular module.
// the 2nd parameter is an array of imports
angular.module('coachApp', ['ionic', _login2.default.name, _searches2.default.name, _loading2.default.name, _authenticate2.default.name, _navigation2.default.name, _players2.default.name, _playerStats2.default.name, _games2.default.name, _gameStats2.default.name, _practice2.default.name, _tabDirective2.default.name]).run(function ($ionicPlatform) {
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
}).config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

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
   }).state('nav.register', {
      url: '/register',
      templateUrl: 'app/login/register.html',
      controller: 'AuthCtrl'
   }).state('nav.players', {
      url: '/players',
      templateUrl: 'app/players/players.html',
      controller: 'PlayersCtrl'
   }).state('nav.player', {
      url: '/players/:playerID',
      templateUrl: 'app/playerStats/playerStats.html',
      controller: 'PlayerStatsCtrl',
      cache: false
   }).state('nav.games', {
      url: '/games/:id',
      templateUrl: 'app/games/games.html',
      controller: 'GamesCtrl'
   }).state('nav.pre', {
      url: '/pre/:gameID',
      templateUrl: 'app/gameStats/preGame.html',
      controller: 'GameStatsCtrl',
      cache: false
   }).state('nav.after', {
      url: '/after/:gameID',
      templateUrl: 'app/gameStats/afterGame.html',
      controller: 'GameStatsCtrl',
      cache: false
   }).state('nav.stats', {
      url: '/stats/:gameID',
      templateUrl: 'app/gameStats/gameStats.html',
      controller: 'GameStatsCtrl',
      cache: false
   }).state('nav.practice', {
      url: '/practice',
      templateUrl: 'app/practice/practice.html',
      cache: false,
      controller: 'PracticeCtrl'
   });

   // if none of the above states are matched, use this as the fallback
   $urlRouterProvider.otherwise('nav/login');
}); // Ionic Starter App


angular.bootstrap(document, ['coachApp']);

},{"./factories/loading.js":2,"./factories/login.js":3,"./factories/searches.js":4,"./gameStats/gameStats.js":5,"./gameStats/tabDirective.js":6,"./games/games.js":7,"./login/authenticate.js":8,"./nav/navigation.js":9,"./playerStats/playerStats.js":10,"./players/players.js":11,"./practice/practice.js":12}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
var loadFactory = angular.module('coachApp.load', []).factory('load', ['$ionicLoading', function ($ionicLoading) {
   var load = {};

   load.show = function () {
      $ionicLoading.show({
         template: '<ion-spinner></ion-spinner>'
      }).then(function () {
         console.log("The loading indicator is now displayed");
      });
   };
   load.hide = function () {
      $ionicLoading.hide().then(function () {
         console.log("The loading indicator is now hidden");
      });
   };

   return load;
}]);

exports.default = loadFactory;

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
var searchFactory = angular.module('coachApp.search', []).factory('search', ['$http', '$window', function ($http, $window) {
   var search = {};

   // Gets user that is logged in. Object.
   var currentUser = JSON.parse($window.localStorage.user);

   // Gets all the players. Parameter is logged in user.
   search.getPlayers = function (user) {
      return $http.post('http://localhost:3000/api/players', user);
   };

   // Adds player to database. Parameter is object of player to be added.
   search.addPlayer = function (player) {
      return $http.put('http://localhost:3000/api/players', player);
   };

   // Removes player from database. Parameter is object of player to be deleted.
   search.removePlayer = function (player) {
      return $http.delete('http://localhost:3000/api/players/' + player._id + "/" + currentUser.username);
   };

   // Gets playerstats (matches) for playerpages. Parameter is $stateParams.
   search.getPlayerStats = function (id) {
      return $http.get('http://localhost:3000/api/playerStats/' + id);
   };

   // Gets playerstats (training) for playerpages. Parameter is $stateParams.
   search.getTrainingStats = function (id) {
      return $http.get('http://localhost:3000/api/trainerStats/' + id);
   };

   // Gets all the games from the logged in user.
   search.getGames = function () {
      return $http.get('http://localhost:3000/api/games/' + currentUser.username);
   };

   // Gets all the stats for game. Parameter is $stateParams.
   search.getGameStats = function (id) {
      return $http.get('http://localhost:3000/api/gameStats/' + id);
   };

   // Updates a game. Parameter is entire ojbect of game.
   search.updateGameStats = function (game) {
      return $http.put('http://localhost:3000/api/gameStats/', game);
   };

   // Adds a new game. Parameter is game to be added.
   search.addGame = function (game) {
      return $http.put('http://localhost:3000/api/games', game);
   };

   // Deletes a game. Parameter is game to be deleted.
   search.removeGame = function (game) {
      return $http.delete('http://localhost:3000/api/games/' + game._id + "/" + currentUser.username);
   };

   // Adds a trainingsession. Players is object of all players and attendance-info.
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

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
var gameStatsCtrl = angular.module('coachApp.GameStatsCtrl', []).controller('GameStatsCtrl', function ($scope, $state, $window, auth, search, $stateParams, $ionicModal) {
   $scope.loggedIn = auth.currentUser();
   $scope.id = $stateParams.gameID;
   $scope.change = {};
   $scope.assist = false;

   search.getGameStats($scope.id).success(function (response) {
      $scope.game = response.game;
   });

   $scope.updateGameStats = function () {
      console.log($scope.assist);
      var stats = $scope.change.stats;
      $scope.game[stats[0]][stats[1]] += 1;
      if (stats[1] === "for" && stats[0] === "goals") {
         $scope.closeModal(1);
         var playerIndex = $scope.game.players.findIndex(function (x) {
            return x._id === $scope.change.id;
         });
         var playerIndex2 = $scope.game.players.findIndex(function (x) {
            return x._id === $scope.change.assist;
         });
         $scope.game.players[playerIndex].goals += 1;
         $scope.game.players[playerIndex].shots += 1;
         $scope.game.players[playerIndex2].assists += 1;
         $scope.game.shots.for += 1;
         $scope.assist = false;
      } else if (stats[1] === "for" && stats[0] !== "goals" && stats[0] !== "corners") {
         $scope.closeModal(1);
         var _playerIndex = $scope.game.players.findIndex(function (x) {
            return x._id === $scope.change.id;
         });
         $scope.game.players[_playerIndex][stats[0]] += 1;
      } else if (stats[1] === "against" && stats[0] === "goals") {
         $scope.closeModal(1);
         $scope.game.shots.against += 1;
      }
      search.updateGameStats($scope.game).success(function (response) {
         console.log('Spelsituation bifogad');
      });
   };

   $scope.setEleven = function () {
      search.updateGameStats($scope.game).success(function (response) {
         console.log('Startelva bifogad');
         $state.go('nav.stats', { gameID: $scope.game._id });
      });
   };

   $scope.saveGameOnEnd = function () {
      $scope.game.players.forEach(function (x) {
         x.minutes.total = x.minutes.out - x.minutes.in;
      });
      search.updateGameStats($scope.game).success(function (response) {
         console.log('Totalt antal minuter tillagt');
         console.log($scope.game._id);
         $state.go('nav.after', { gameID: $scope.game._id });
      });
   };

   $scope.giveBonus = function () {
      $scope.closeModal(3);
      search.updateGameStats($scope.game).success(function (response) {
         console.log('Delade ut pluspoäng');
      });
   };

   $scope.sub = {};
   $scope.makeSub = function () {
      $scope.closeModal(2);
      var subInIndex = $scope.game.players.findIndex(function (x) {
         return x._id === $scope.sub.in;
      });
      var subOutIndex = $scope.game.players.findIndex(function (x) {
         return x._id === $scope.sub.out;
      });
      $scope.game.players[subInIndex].minutes.in = $scope.sub.time;
      $scope.game.players[subInIndex].minutes.out = 90;
      $scope.game.players[subOutIndex].minutes.out = $scope.sub.time;
      search.updateGameStats($scope.game).success(function (response) {
         console.log('Byte genomfört');
         $window.location.reload(true);
      });
   };

   $scope.isNinety = function (player) {
      if (player.minutes.out === 90) {
         return true;
      } else {
         return false;
      }
   };
   $scope.notNinety = function (player) {
      if (player.minutes.out !== 90) {
         return true;
      } else {
         return false;
      }
   };
   $scope.playerOnBench = function (player) {
      if (player.minutes.out === 0) {
         return true;
      } else {
         return false;
      }
   };
   $scope.hasPlayed = function (player) {
      if (player.minutes.out > 0) {
         return true;
      } else {
         return false;
      }
   };

   $scope.setEvent = function () {
      console.log($scope.change.stats[0]);
      switch ($scope.change.stats[0]) {
         case "goals":
            $scope.assist = true;
            $scope.event = "Målskytt:";
            break;
         case "shots":
            $scope.assist = false;
            $scope.event = "Avslutare:";
            break;
         case "yellow":
            $scope.assist = false;
            $scope.event = "Gult kort till:";
            break;
         case "red":
            $scope.assist = false;
            $scope.event = "Rött kort till:";
            break;
      }
   };

   $ionicModal.fromTemplateUrl('/app/gameStats/modal.html', {
      id: '1',
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function (modal) {
      $scope.modal1 = modal;
   });
   $ionicModal.fromTemplateUrl('/app/gameStats/modalsub.html', {
      id: '2',
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function (modal) {
      $scope.modal2 = modal;
   });
   $ionicModal.fromTemplateUrl('/app/gameStats/modalbonus.html', {
      id: '3',
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function (modal) {
      $scope.modal3 = modal;
   });
   $scope.openModal = function (id) {
      if (id === 1) {
         $scope.modal1.show();
      } else if (id === 2) {
         $scope.modal2.show();
      } else {
         $scope.modal3.show();
      }
   };
   $scope.closeModal = function (id) {
      if (id === 1) {
         $scope.modal1.hide();
      } else if (id === 2) {
         $scope.modal2.hide();
      } else {
         $scope.modal3.hide();
      }
   };
});

exports.default = gameStatsCtrl;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
var tabDir = angular.module('coachApp.tabDir', []).directive('tabsForGame', function () {
   return {
      templateUrl: 'app/gameStats/tab.html',
      controller: 'GameStatsCtrl'
   };
});

exports.default = tabDir;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
var gamesCtrl = angular.module('coachApp.GamesCtrl', []).controller('GamesCtrl', function ($scope, $state, $window, auth, search, $ionicModal) {
   $scope.loggedIn = auth.currentUser();
   $scope.game = {};
   $scope.game.venue = "Hemma";

   search.getGames().success(function (response) {
      $scope.allGames = response.games;
   });

   $scope.addGame = function () {
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

},{}],8:[function(require,module,exports){
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

   $scope.goTo = function () {
      $state.go('nav.register');
   };
});

exports.default = AuthCtrl;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
var navCtrl = angular.module('coachApp.NavCtrl', []).controller('NavCtrl', function ($scope, $state, $window, auth) {
   $scope.loggedIn = false;
   // // Uses function in auth to check if user is logged in
   if (auth.isLoggedIn()) {
      $scope.user = auth.currentUser();
      $scope.username = $scope.user.username;
   }
   if ($scope.user) {
      $scope.club = $scope.user.club;
      $scope.loggedIn = true;
   }

   // Logout in auth-factory, clears local-storage. Then go to home.
   $scope.logOut = function () {
      auth.logOut();
      $window.location.reload(true);
      $state.go('nav.login');
   };
});

exports.default = navCtrl;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
var playerStatsCtrl = angular.module('coachApp.PlayerStatsCtrl', []).controller('PlayerStatsCtrl', function ($scope, $state, auth, search, $stateParams) {
   $scope.loggedIn = auth.currentUser();
   $scope.id = $stateParams.playerID;
   $scope.isNumber = angular.isNumber;
   $scope.flipped = false;

   search.getPlayerStats($scope.id).success(function (response) {
      $scope.player = response.player[0];
   });

   search.getTrainingStats($scope.id).success(function (response) {
      $scope.trainer = response.trainer[0];
   });
});

exports.default = playerStatsCtrl;

},{}],11:[function(require,module,exports){
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
         $scope.modal.hide();
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

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
var practiceCtrl = angular.module('coachApp.PracticeCtrl', []).controller('PracticeCtrl', function ($scope, $state, auth, search, $ionicPopup) {
   $scope.loggedIn = auth.currentUser();
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
         $scope.showAlert();
      });
   };

   // An alert dialog
   $scope.showAlert = function () {
      var alertPopup = $ionicPopup.alert({
         title: 'Träningen har sparats.',
         template: 'Bra jobbat!',
         buttons: [{
            text: 'Ok',
            type: 'button-royal'
         }]
      });

      alertPopup.then(function (res) {
         console.log('Popup closed');
      });
   };
});

exports.default = practiceCtrl;

},{}]},{},[1])


//# sourceMappingURL=main.js.map
