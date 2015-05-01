'use strict';

/**
 * @ngdoc function
 * @name firebaseTestApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the firebaseTestApp
 */
angular.module('firebaseTestApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
