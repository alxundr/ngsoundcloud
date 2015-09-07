'use strict';

angular.module('ngsoundcloudApp')
  .factory('Playlist', function ($http, $rootScope) {
    // Service logic
    // ...

    var query = "";
    var queryResults = [];
    var currentUser = {};

    $rootScope.playlist = [];

    // Public API here
    return {
      add: function (track, callback) {
        var cb = callback || angular.noop;
        $rootScope.playlist.push(track);
        $http.post('/api/users/' + currentUser._id + '/playlist/', {
          playlist: $rootScope.playlist
        }).
          success(function(response) {
            cb(false, response);
          }).
          error(function(err) {
            cb(err, false);
          });
      },
      setCurrentUser: function(user) {
        currentUser = user;
        $rootScope.playlist = user.playlist;
      },
      setPlaylist: function(newPlaylist) {
        $rootScope.playlist = newPlaylist;
      },
      clearPlaylist: function() {
        $rootScope.playlist = [];
      },
      getPlaylist: function() {
        return $rootScope.playlist;
      },
      saveAlteredPlaylist: function(altPlaylist, callback) {
        var cb = callback || angular.noop;
        $http.post('/api/users/' + currentUser._id + '/playlist/', {
          playlist: altPlaylist
        }).
          success(function(response) {
            $rootScope.playlist = altPlaylist;
            cb(false, response);
          }).
          error(function(err) {
            cb(err, false);
          });
      },
      remove: function(track, callback) {
        var cb = callback || angular.noop;
        var tempPlaylist = angular.copy($rootScope.playlist);
        tempPlaylist.splice(tempPlaylist.indexOf(track), 1);
        $http.post('/api/users/' + currentUser._id + '/playlist/', {
          playlist: tempPlaylist
        }).
          success(function(response) {
            $rootScope.playlist.splice($rootScope.playlist.indexOf(track), 1);
            cb(false, response);
          }).
          error(function(err) {
            cb(err, false);
          });
      },
      playTrack: function(track, tracklist) {

        var me = this;
        $rootScope.currentTrack = track;
        try {
          $rootScope.$digest();
        } catch(e) {}
        window.SC.oEmbed(track.permalink_url, {
          auto_play: true,
          buying: false,
          liking: false,
          sharing: false,
          show_comments: false,
          maxheight: 166
        }, document.getElementById('player'));

        setTimeout(function(){

          var widgetIframe = document.getElementById('player').getElementsByTagName('iframe')[0];
          var widget  = window.SC.Widget(widgetIframe);

          widget.bind(window.SC.Widget.Events.READY, function() {
            widget.bind(window.SC.Widget.Events.FINISH, function() {
              var nextIndex = tracklist.indexOf(track) + 1;
              if (nextIndex < tracklist.length) {
                track = tracklist[nextIndex];
              } else {
                track = tracklist[0];
              }
              me.playTrack(track, tracklist);
            });
          });

        },2000);
      },
      getOtherUserPlaylist: function(userId, callback) {
        var cb = callback || angular.noop;
        $http.get('/api/users/' + userId+ '/playlist/').
          success(function(playlist) {
            cb(false, playlist)
          }).
          error(function(err) {
            cb(err, false);
          });
      }
    };
  });
