'use strict';

/**
 * @ngdoc function
 * @name firebaseTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the firebaseTestApp
 */
angular.module('firebaseTestApp')
  .controller('MainCtrl', function ($scope, $firebaseArray) {

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var ref = new Firebase("https://glaring-inferno-8842.firebaseio.com/");


    $scope.typing = function(e){
      if (e.which == 13){
        $scope.messages.$add({
          text: $scope.messageInp
        });
        $scope.messageInp = "";
      }
    }

    // $scope.data = $firebaseObject(ref);

    $scope.messages = $firebaseArray(ref);

    //syncObject.$bindTo($scope, "data");

    $scope.sayHello = function(){
      console.log($scope.messages);
    }
  });
