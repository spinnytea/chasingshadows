'use strict';
var _ = require('lodash');
var util = require('util');
var Base = require('../../baseClass');

/* definition of a base player object */
var Player = module.exports = function() {
  Base.call(this);
  _.merge(this, {
    active: false,
    speed: 30,
    doLeft: false,
    doUp: false,
    doRight: false,
    doDown: false
  });
};

util.inherits(Player, Base);

Player.prototype.interact = function(){
  // interact with nearby object
  // hugging
};

Player.prototype.attack = function() {

};