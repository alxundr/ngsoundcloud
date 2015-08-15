'use strict';

angular.module('ngsoundcloudApp')
  .controller('SearchCtrl', function ($scope, Auth, $location, Search, Playlist) {

    if (!Auth.isLoggedIn()) {
      $location.path('/login');
    }

    $scope.options = {};

    $scope.alert = { show: false};

    $scope.options.q = Search.getQuery();
    $scope.tracks = Search.getQueryResults();

    $scope.search = function() {
      Search.setQuery($scope.options.q);
      Search.search($scope.options, function(err, tracks) {
        if (err) {
          $scope.alert.type = "danger";
          $scope.alert.message = err;
          $scope.alert.show = true;
        } else {
          $scope.tracks = tracks;
          Search.setQueryResults(tracks);
        }
      });
    };

    $scope.addToPlaylist = function(track) {
      Playlist.add(track, function(err, response) {
        if (err) {
          $scope.alert.type = "danger";
          $scope.alert.message = err;
        }
        else {
          $scope.alert.type = "success";
          $scope.alert.message = track.title + " saved to playlist";
        }
        $scope.alert.show = true;
      });
    };

  });
