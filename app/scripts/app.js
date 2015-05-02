'use strict';

/**
 * @ngdoc overview
 * @name firebaseTestApp
 * @description
 * # firebaseTestApp
 *
 * Main module of the application.
 */

 
angular
  .module('firebaseTestApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ]).filter('colorize', function() {
    return function(input) {
      var sum = 0;
      var static_colors =
       ["#0A95BF", "#B54474", "#F5863C", "#DBB85E", "#BC3C36", "#98468F", "#44C9D7"];



      if (input)
        for (var i = 0, len = input.length; i < len; i++) {
          sum += input[i].charCodeAt(0);
        }

      //console.log(sum);
      return static_colors[sum%static_colors.length];
      //return input ? '\u2713' : '\u2718';
    };
  })
  .config(function ($routeProvider,$sceProvider) {
    //$sceProvider.enabled(false);
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
