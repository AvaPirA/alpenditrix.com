(function() {
  'use strict';

  var ineluki = angular
    .module('Ineluki', [
      'ui.router',
      'templates'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('blog', {
          url: "/blog",
          views: {
            'main': {
              templateUrl: "route/blog/main.html"
            }
          }
        })
        .state('dummy', {
          url: "/",
          views: {
            'main': {
              templateUrl: "route/dummy/main.html"
            }
          }
        });
    }]);

})();