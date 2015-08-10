'use strict';

angular.module('ngsoundcloudApp')
  .factory('Playlist', function ($http) {
    // Service logic
    // ...

    var playlist = [];
    var query = "";
    var queryResults = [];

    // Public API here
    return {
      add: function (track, callback) {
        var cb = callback || angular.noop;

        playlist.push(track);

        $http.post('/api/users/playlist/save', {
          playlist: playlist
        }).
          success(function(response) {
            cb(false, response);
          }).
          error(function(err) {
            cb(err, false);
          });
      },
      all: function() {
        return playlist;
      },
      setPlaylist: function(newPlaylist) {
        playlist = newPlaylist;
      },
      clearPlaylist: function() {
        playlist = [];
      },
      playTrack: function(track) {

        var me = this;

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
              console.log('track finished');

              var nextIndex = playlist.indexOf(track) + 1;
              if (nextIndex < playlist.length) {
                track = playlist[nextIndex];
              } else {
                track = playlist[0];
              }
              me.playTrack(track);
            });
          });

        },2000);
      }
    };
  });
