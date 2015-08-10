exports.serialize = function(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

exports.convertMS = function(ms) {
  var h, m, s;
  s = Math.floor(ms / 1000);
  m = Math.floor(s / 60);
  s = s % 60;
  var seconds = '' + s;
  if (s < 10) {
    seconds = '0' + s;
  }
  h = Math.floor(m / 60);
  m = m % 60;
  h = h % 24;
  var minutes = '' + m;
  var hours = '' + h;
  var display;
  if (h === 0) {
    display = minutes + ':' + seconds;
  } else {
    if (m < 10) {
      minutes = '0' + m;
    }
    display = hours + ':' + minutes + ':' + seconds;
  }
  return display;
};
