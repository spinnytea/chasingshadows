var _ = require('lodash');
var angular = require('angular');
var socket = require('socket.io-client')('http://localhost:3030');

var app = angular.module('chasingshadows', []);

app.value('angular', angular);
app.value('audioContext', require('./audio'));
app.factory('gameObjects', require('./models/gameObjects'));
app.factory('object.base', require('./models/objects/base'));
app.factory('object.player', require('./models/objects/player'));

app.controller('rootController', require("./controllers/root"));
app.controller('mapController', require("./controllers/map"));

socket.on('connect', function() {
    console.log('connected');
});
socket.emit('event', { key: "value" });