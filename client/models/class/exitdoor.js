'use strict';
var util = require('util');

module.exports = [
'object.class.base',
function(Base) {

  /* one per room, opens when unlocked.
   * players can leave room through door.
   * door does not move.
   */
  function ExitDoor(options) {
    Base.call(this, options);
    this.locked = true;
  }

  util.inherits(ExitDoor, Base);

  return ExitDoor;
}];