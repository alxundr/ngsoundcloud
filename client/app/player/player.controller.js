'use strict';

angular.module('ngsoundcloudApp')
  .controller('PlayerCtrl', function ($rootScope, $scope, Playlist) {

    $scope.playlist = Playlist.all();
    $scope.currentTrack = $rootScope.currentTrack;
    $scope.alert = { show: false};

    $rootScope.$watch(function($rootScope) {
      return $rootScope.currentTrack;
    }, function(track) {
      $scope.currentTrack = track;
    });

    $scope.play = function(track) {
      Playlist.playTrack(track);
    };

    $scope.isPlaying = function(track) {
      return $scope.currentTrack == track;
    };

    $scope.remove = function(track) {
      Playlist.remove(track, function(err, response) {
        if (err) {
          $scope.alert.type = "danger";
          $scope.alert.message = err;
          $scope.alert.show = true;
        }
      })
    };

  });
