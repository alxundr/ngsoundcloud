'use strict';

angular.module('ngsoundcloudApp')
  .controller('PlayerCtrl', function ($rootScope, $scope, Playlist, Auth) {

    $scope.tracks = Playlist.getPlaylist();
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
      if (Auth.isLoggedIn()) {
        document.body.style.paddingTop = "236px";
        Playlist.playTrack(track, $scope.tracks);  
      } else {
        Auth.clearCurrentUser();
      }
      
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
