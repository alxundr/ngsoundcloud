'use strict';

angular.module('ngsoundcloudApp')
  .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q, Playlist) {

    if($cookieStore.get('token')) {
      $rootScope.currentUser = User.get(function(user) {
        Playlist.setCurrentUser(user);
      });
    } else {
      
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user) {
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
          $cookieStore.put('token', data.token);          
          $rootScope.currentUser = User.get(function(user) {
              Playlist.setCurrentUser(user);
              deferred.resolve();
          });
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        $cookieStore.remove('token');
        $rootScope.currentUser = null;
        Playlist.clearPlaylist();
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;

        return User.save(user,
          function(data) {
            $cookieStore.put('token', data.token);
            $rootScope.currentUser = User.get();
            return cb(user);
          },
          function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return $rootScope.currentUser;
      },

      clearCurrentUser: function() {
        $rootScope.currentUser = null;
        Playlist.clearPlaylist();
        $location.path('/login');
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        if (!$rootScope.currentUser) {
          return false;
        } else {
          return $rootScope.currentUser.hasOwnProperty('role');
        }
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function() {
        var deferred = $q.defer();
        if (!$rootScope.currentUser) {
          Playlist.clearPlaylist();
          deferred.reject();
        } else {
          $rootScope.currentUser = User.get(function(user) {
            deferred.resolve();
          });

        }
        return deferred.promise;
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        if (!$rootScope.currentUser) {
          return false
        } else {
          return $rootScope.currentUser.role === 'admin';  
        }        
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  });
