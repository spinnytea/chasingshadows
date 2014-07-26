var angular = require('angular');

var app = angular.module('chasingshadows', []);

app.factory("playerModel", require('./models/player'));
app.controller("mapController", require("./controllers/map"));
