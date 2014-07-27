'use strict';
var util = require('util');
var Base = require('../../baseClass');

var MageProjectile = module.exports = function() {
  Base.call(this);
  this.locked = true;
};

util.inherits(MageProjectile, Base);