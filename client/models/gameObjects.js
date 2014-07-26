'use strict';

module.exports = [
'socket',
function(socket) {
  var instance = {};
  instance.objects = {};

  socket.on('objects-register', function(data) {
  });

  socket.on('objects-update', function(data) {
  });

  socket.on('objects-remove', function(data) {
    delete instance.objects[data.id];
  });

  return instance;
}];