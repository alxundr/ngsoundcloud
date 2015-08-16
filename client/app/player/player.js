'use strict';

angular.module('ngsoundcloudApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('player', {
        url: '/',
        templateUrl: 'app/player/player.html',
        controller: 'PlayerCtrl'
      });
  });
