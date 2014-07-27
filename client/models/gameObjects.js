'use strict';
var _ = require('lodash');

module.exports = [
'$timeout', 'socket', 'object.class.base', 'sprite.config',
function($timeout, socket, Base, sprite_config) {
  var instance = {};
  instance.objects = {};

  socket.on('objects-register', function(data) {
    _.forOwn(data, function(obj, id) {
      // if something already exists, we want to overwrite it
      instance.objects[id] = new Base();
      _.merge(instance.objects[id], obj);

      if(!_.isUndefined(obj.sprite)) {
        _.merge(instance.objects[id], sprite_config[obj.sprite.sheet]);
      }

      instance.objects[id].update();
    });
  });

  socket.on('objects-update', function(data) {
    _.forOwn(data, function(obj, id) {
      // if something already exists, we want to overwrite it
      _.merge(instance.objects[id], obj);
      instance.objects[id].update();
    });
  });

  socket.on('objects-remove', function(id) {
    delete instance.objects[id];
  });

  function spriteCycle () {
    $timeout(function() {
      _.forOwn(instance.objects, function(obj) {
        obj.sprite.nextFrame();
      });
      spriteCycle();
    }, 200);
  }
  spriteCycle();


  return instance;
}];