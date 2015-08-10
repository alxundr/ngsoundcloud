'use strict';

angular.module('ngsoundcloudApp')
  .factory('Search', function ($http) {
    // Service logic
    // ...
    var query = "";
    var queryResults = [];

    // Public API here
    return {
      search: function (options, callback) {
        var cb = callback || angular.noop;
        $http.post('/api/search', options).
        success(function(data) {
            cb(false, data.tracks);
          }).
        error(function(err) {
            cb(err, false);
          });
      },
      setQuery: function(q) {
        query = q;
      },
      getQuery: function() {
        return query;
      },
      setQueryResults: function(tracks) {
        queryResults = tracks;
      },
      getQueryResults: function() {
        return queryResults;
      }
    };
  });
