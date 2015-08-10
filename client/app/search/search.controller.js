'use strict';

angular.module('ngsoundcloudApp')
  .controller('SearchCtrl', function ($scope, Auth, $location, Search, Playlist) {

    if (!Auth.isLoggedIn()) {
      $location.path('/login');
    }

    $scope.options = {};

    $scope.options.q = Search.getQuery();
    $scope.tracks = Search.getQueryResults();

    $scope.search = function() {
      Search.setQuery($scope.options.q);
      Search.search($scope.options, function(err, tracks) {
        if (err) console.err(err);
        $scope.tracks = tracks;
        Search.setQueryResults(tracks);
      });
    };

    $scope.addToPlaylist = function(track) {
      Playlist.add(track, function(err, response) {
        if (err) console.err(err);
        else console.log(response);
      });
    };

  });
