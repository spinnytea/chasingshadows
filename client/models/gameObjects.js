'use strict';
var _ = require('lodash');

module.exports = [
'socket',
function(socket) {
  var instance = {};
  instance.objects = {};

  socket.on('objects-register', function(data) {
    _.forOwn(data, function(obj, id) {
      // if something already exists, we want to overwrite it
      instance.objects[id] = obj;
    });
  });

  socket.on('objects-update', function(data) {
    _.forOwn(data, function(obj, id) {
      // if something already exists, we want to overwrite it
      _.merge(instance.objects[id], obj);
    });
  });

  socket.on('objects-remove', function(data) {
    delete instance.objects[data.id];
  });

  return instance;
}];