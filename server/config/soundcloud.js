'use strict';

var soundcloud = require('node-soundcloud');
var config = require('./environment');

var initSouncloud = function() {
  soundcloud.init(config.soundcloud);
};

exports.init =  initSouncloud;

