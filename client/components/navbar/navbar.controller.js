'use strict';

angular.module('ngsoundcloudApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $rootScope) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.currentTrack = $rootScope.currentTrack;

    $rootScope.$watch(function($rootScope) {
      return $rootScope.currentTrack;
    }, function(track) {
      $scope.currentTrack = track;
    });

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
