'use strict';
var util = require('util');

/* definition of a base player object */
module.exports = [ 
'object.class.base',
function(Base) {

  function Player(options) {
    Base.call(this, options);
  }

  util.inherits(Player, Base);

  Player.prototype.interact = function(){
    // interact with nearby object
    // hugging
  };

  Player.prototype.attack = function() {

  };

  return Player;
}];