var polyfill = require('./polyfill.js'),
  Motion = require('./coreMotion.js');

var global = window;

var success = function (stream) {
  var motion = new Motion(stream);
};

var error = function () {
  throw new Error('Access has been denied');
};

var create = function () {

  polyfill.init();

  if (!global.navigator.getUserMedia) {
    return false;
  }

  global.navigator.getUserMedia({
    video: true,
    audio: false
  }, success, error);

  return true;

};

module.exports = {
  create: create
};
