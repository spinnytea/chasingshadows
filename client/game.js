var angular = require('angular');

var app = angular.module('chasingshadows', []);

app.factory('playerModel', require('./models/player'));
app.factory('gameObjects', require('./models/gameObjects'));

app.controller('mapController', require("./controllers/map"));
