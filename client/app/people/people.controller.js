'use strict';

angular.module('ngsoundcloudApp')
  .controller('PeopleCtrl', function ($scope, User, Auth, $location) {

    if (!Auth.isLoggedIn()) {
      $location.path('/login');
    }

    $scope.users = User.query();

    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.isActive = function(userId) {
      console.log('userId', userId, 'location', $location.path());
      return '/people/' + userId === $location.path();
    }

  });
