'use strict';
//var _ = require('lodash');
var angular = require('angular');
var config = require('./config');
var socket = require('socket.io-client')('http://localhost:'+config.port);
var audio = require('./audio');

if(config.audio_pause)
  audio.bgmusic.pause();

socket.on('connect', function() {
  console.log('connected');
});

var app = angular.module('chasingshadows', []);

app.value('angular', angular);
app.value('audioContext', audio);
app.value('socket', socket);
app.value('config', config);

app.factory('object.class.base', require('./models/class/base'));
app.factory('object.class.player', require('./models/class/player'));
app.factory('object.class.mage', require('./models/class/mage'));
app.factory('object.class.teddy', require('./models/class/teddy'));
app.factory('object.class.exitdoor', require('./models/class/exitdoor'));
app.factory('object.class.mageprojectile', require('./models/class/mageprojectile'));

app.factory('gameObjects', require('./models/gameObjects'));

app.factory('object.player', require('./models/objects/player'));

app.controller('rootController', require('./controllers/root'));
app.controller('mapController', require('./controllers/map'));