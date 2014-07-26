var util = require('util');

/* functionality of teddy character */
module.exports = [ 
'object.class.player',
function(Player) {

  function Teddy(options) {
    Player.call(this, options);
  }

  util.inherits(Teddy, Player);

  Teddy.prototype.attack = function() {

  }

  return Teddy;
}];