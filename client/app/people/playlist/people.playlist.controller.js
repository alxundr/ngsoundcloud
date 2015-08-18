'use strict';

angular.module('ngsoundcloudApp')
  .controller('PeoplePlaylistCtrl', function ($scope, Playlist, Auth, $location, $stateParams) {

    $scope.alert = { show: false};

    if (!Auth.isLoggedIn()) {
      $location.path('/login');
    } else {
      var userId = $stateParams.userid;
      Playlist.getOtherUserPlaylist(userId, function(err, playlist) {
        if (!err) {
          $scope.tracks = playlist;
        } else {
          $scope.alert.type = "danger";
          $scope.alert.message = err;
          $scope.alert.show = true;
        }
      });
    }

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

    $scope.addAndPlay = function(track) {
      $scope.addToPlaylist(track, function() {
        Playlist.playTrack(track);
      });
    };


  });
