'use strict';

angular.module('ngsoundcloudApp')
  .controller('PeopleCtrl', function ($scope, User, Auth, $location) {

    $scope.users = User.query();

    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.isActive = function(userId) {
      return '/people/' + userId === $location.path();
    }

  });
