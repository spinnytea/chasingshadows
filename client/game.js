var _ = require('lodash');
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

app.factory('gameObjects', require('./models/gameObjects'));
app.factory('object.base', require('./models/objects/base'));
app.factory('object.player', require('./models/objects/player'));

app.controller('rootController', require("./controllers/root"));
app.controller('mapController', require("./controllers/map"));