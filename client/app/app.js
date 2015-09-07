'use strict';

angular.module('ngsoundcloudApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ui.sortable'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        
        if(response.status === 401) {          
          if($location.path() != "/search") {
            $location.path('/login');
          }
          // remove any stale tokens
          $cookieStore.remove('token');
          $rootScope.currentUser = null;
          $rootScope.playlist = [];
          return $q.reject(response);
        }
        else {
          console.log("other response", response);
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {

      Auth.isLoggedInAsync().
        catch(function() {
          if($location.path() != "/search") {
            event.preventDefault();
            $location.path('/login');
          }
        });
    });

  });
