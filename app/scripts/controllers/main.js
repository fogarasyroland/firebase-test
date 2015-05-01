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


    function authDataCallback(authData) {
      if (authData) {
        $scope.uid = authData.uid;
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
      } else {
        console.log("User is logged out");
        ref.authAnonymously(function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
          }
        },{remember: "sessionOnly"})
      }
    }

    ref.onAuth(authDataCallback);


    $scope.typing = function(e){
      if (e.which == 13){
        $scope.messages.$add({
          uid: $scope.uid,
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
