'use strict';

angular.module('ngsoundcloudApp')
  .controller('MainCtrl', function ($scope, Playlist) {

    $scope.playlist = Playlist.all();

    $scope.play = function(track) {
      Playlist.playTrack(track);
    };

  });
