'use strict';

var _ = require('lodash');
var soundcloud = require('node-soundcloud');
var util = require('../../components/utils/functions');

// Get list of searchs
exports.index = function(req, res) {
  if (req.body.q) {
    soundcloud.get('/tracks?' + util.serialize({
        q: req.body.q,
        limit : req.body.limit || 50,
        offset: req.body.start || 0
      }), function(err, tracks) {
      if (err) handleError(res, err);
      else {
        var oldDuration;
        var response = [];
        tracks.forEach(function(track, index) {
          response.push({
            duration: util.convertMS(track.duration),
            permalink_url: track.permalink_url,
            title: track.title,
            username: track.user.username
          });
          if (index + 1 == tracks.length) {
            res.json({
              total: response.length,
              tracks: response
            })
          }
        });
      }
    });
  } else {
    res.json({error: 'especify a query to search for'});
  }
};

function handleError(res, err) {
  return res.status(500).send(err);
}
