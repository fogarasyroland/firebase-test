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
        var ccc = null;
        if ($scope.color) ccc = $scope.color;
        $scope.messages.$add({
          uid: $scope.uid,
          text: $scope.messageInp,
          color: ccc,
          time: Firebase.ServerValue.TIMESTAMP
        });
        $scope.messageInp = "";
      }
    }

    // $scope.data = $firebaseObject(ref);

    $scope.messages = $firebaseArray(ref);

    $scope.unseenMsg = 0;
    $scope.isFocus = true;

      function onFocus() {
        console.log(123);
        $scope.unseenMsg = 0;
        document.getElementsByTagName('title')[0].innerHTML = "Rapidchat"
        $scope.isFocus = true;
      }
      window.onfocus = onFocus;

      window.onblur = function(){
        $scope.isFocus = false;
      };



    //syncObject.$bindTo($scope, "data");

    ref.on('value', function(dataSnapshot) {
      if (!$scope.isFocus) $scope.unseenMsg++;
      if ($scope.unseenMsg <= 0)
        document.getElementsByTagName('title')[0].innerHTML = "Rapidchat";
      else
        document.getElementsByTagName('title')[0].innerHTML = "(" + ($scope.unseenMsg) + ") Rapidchat";
    });

    $scope.sayHello = function(){
      console.log($scope.messages);
    }
  });
