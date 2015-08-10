'use strict';

var _ = require('lodash');
var Track = require('./track.model');

// Get list of tracks
exports.index = function(req, res) {
  Track.find(function (err, tracks) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(tracks);
  });
};

// Get a single track
exports.show = function(req, res) {
  Track.findById(req.params.id, function (err, track) {
    if(err) { return handleError(res, err); }
    if(!track) { return res.status(404).send('Not Found'); }
    return res.json(track);
  });
};

// Creates a new track in the DB.
exports.create = function(req, res) {
  Track.create(req.body, function(err, track) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(track);
  });
};

// Updates an existing track in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Track.findById(req.params.id, function (err, track) {
    if (err) { return handleError(res, err); }
    if(!track) { return res.status(404).send('Not Found'); }
    var updated = _.merge(track, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(track);
    });
  });
};

// Deletes a track from the DB.
exports.destroy = function(req, res) {
  Track.findById(req.params.id, function (err, track) {
    if(err) { return handleError(res, err); }
    if(!track) { return res.status(404).send('Not Found'); }
    track.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}