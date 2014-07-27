'use strict';
var _ = require('lodash');
var util = require('util');
var Player = require('./player');

/* functionality of mage character */
var Mage = module.exports = function(options) {
  Player.call(this, options);
  _.merge(this, {
    bounds: {
      x: 150,
      y: 150,
      width: 30,
      height: 35
    },
    sprite: { sheet: 'babyboy' }
  });
};

util.inherits(Mage, Player);

Mage.prototype.attack = function() {

};