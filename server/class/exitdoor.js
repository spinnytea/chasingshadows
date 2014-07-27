'use strict';
var util = require('util');
var Base = require('../../baseClass');

/* one per room, opens when unlocked.
 * players can leave room through door.
 * door does not move.
 */
var ExitDoor = module.exports = function() {
  Base.call(this);
  this.locked = true;
};

util.inherits(ExitDoor, Base);