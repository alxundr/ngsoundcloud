'use strict';

angular.module('ngsoundcloudApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('people', {
        url: '/people',
        templateUrl: 'app/people/people.html',
        controller: 'PeopleCtrl'
      }).state('people.playlist', {
        url: '/:userid',
        templateUrl: 'app/people/playlist/people.playlist.html',
        controller: 'PeoplePlaylistCtrl'
      });
  });
