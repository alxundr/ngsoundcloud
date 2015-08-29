'use strict';

angular.module('ngsoundcloudApp')
  .controller('SearchCtrl', function ($scope, Auth, $location, Search, Playlist, $rootScope) {

    if (!Auth.isLoggedIn()) {
      $location.path('/login');
    }

    $scope.options = {};

    $scope.alert = { show: false};

    $scope.options.q = Search.getQuery();
    $scope.tracks = Search.getQueryResults();
    $scope.currentTrack = $rootScope.currentTrack;

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

    $scope.addToPlaylist = function(track, callback) {
      var cb = callback || angular.noop;
      Playlist.add(track, function(err, response) {
        if (err) {
          $scope.alert.type = "danger";
          $scope.alert.message = err;
        }
        else {
          $scope.alert.type = "success";
          $scope.alert.message = track.title + " saved to playlist";
          cb();
        }
        $scope.alert.show = true;
      });
    };

    $scope.play = function(track) {
      document.body.style.paddingTop = "236px";
      Playlist.playTrack(track, $scope.tracks);
    };

    $scope.isPlaying = function(track) {
      return $scope.currentTrack == track;
    };

    $rootScope.$watch(function($rootScope) {
      return $rootScope.currentTrack;
    }, function(track) {
      $scope.currentTrack = track;
    });

  });
