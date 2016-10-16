(function() {
  'use strict';

  var ineluki = angular
    .module('Ineluki', [
      'ui.router',
      'ngAnimate',
      'templates'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('blog', {
          url: "/test",
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
    }])
    .run(['$rootElement', '$animate', function(appHtmlElement, $animate) {
      // alert(angular.toJson(bowser, 2));
      var redflag = ['mobile', 'tablet', 'ios', 'angdroid', 'samsungBrowser', 'phantom', 'bada', 'tizen', 'ucbrowser', 'webos', 'msie'];
      if(hasOneOf.call(bowser, redflag)) {
        appHtmlElement.find('body').toggleClass('recursive-no-transition');
        $animate.enabled(false);
      }

      function hasOneOf(properties) {
        for(var i = 0; i < properties.length; i++) {
          if(this.hasOwnProperty(properties[i])) {
            return true;
          }
        }
        return false;
      }
    }]);




})();