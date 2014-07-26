var _ = require('lodash');
var angular = require('angular');

var app = angular.module('chasingshadows', []);

app.value('angular', angular);
app.value('audioContext', require('./audio'));
app.factory('gameObjects', require('./models/gameObjects'));
app.factory('object.base', require('./models/objects/base'));
app.factory('object.player', require('./models/objects/player'));

app.controller('rootController', require("./controllers/root"));
app.controller('mapController', require("./controllers/map"));
