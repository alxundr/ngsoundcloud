'use strict';

angular.module('ngsoundcloudApp')
  .controller('PlayerCtrl', function ($rootScope, $scope, Playlist) {

    $scope.tracks = Playlist.all();
    $scope.currentTrack = $rootScope.currentTrack;
    $scope.alert = { show: false};

    $rootScope.$watch(function($rootScope) {
      return $rootScope.currentTrack;
    }, function(track) {
      $scope.currentTrack = track;
    });

    $scope.sortableOptions = {
      update: function(event, ui) {
        Playlist.saveAlteredPlaylist($scope.tracks, function(err, response) {
          if (err) $scope.tracks = Playlist.all();
        });
      }
    };

    $scope.play = function(track) {
      document.body.style.paddingTop = "236px";
      Playlist.playTrack(track, $scope.tracks);
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
