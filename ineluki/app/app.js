(function() {
  'use strict';

  var ineluki = angular
      .module('Ineluki', [
        'ui.router',
        'templates'
        ])
      .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
           $urlRouterProvider.otherwise('');

          $stateProvider
            .state('dummy', {
            url: "",
            views: {
                "main": {
                    templateUrl: "route/dummy/main.html"
                },
                "footer": {
                    templateUrl: "route/dummy/footer.html"
                }
            }
            });
        }]);

})();