'use strict';
var util = require('util');

/* functionality of mage character */
module.exports = [ 
'object.class.player',
function(Player) {

  function Mage(options) {
    Player.call(this, options);
  }

  util.inherits(Mage, Player);

  Mage.prototype.attack = function() {

  };

  return Mage;
}];