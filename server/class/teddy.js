'use strict';
var util = require('util');
var Player = require('./player');

/* functionality of teddy character */
var Teddy = module.exports = function() {
  Player.call(this);
};

util.inherits(Teddy, Player);

Teddy.prototype.attack = function() {

};