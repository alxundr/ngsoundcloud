'use strict';

var soundcloud = require('node-soundcloud');
var config = require('./local.env');

var initSouncloud = function() {
  soundcloud.init(config.soundcloud);
};

exports.init =  initSouncloud;

