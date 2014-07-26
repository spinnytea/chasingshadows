var util = require('util');

module.exports = [
'object.class.base',
function(Base) {

  function MageProjectile(options) {
    Base.call(this, options);
    this.locked = true;
  }

  util.inherits(MageProjectile, Base);

  return MageProjectile;

}];