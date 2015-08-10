'use strict';

angular.module('ngsoundcloudApp')
  .controller('MainCtrl', function ($scope, Playlist, Auth) {

    $scope.playlist = Auth.getCurrentUser().playlist;

    $scope.play = function(track) {
      Playlist.playTrack(track);
    };

  });
