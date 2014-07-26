var _ = require('lodash');
var touch = require('touch');
var express = require('express');
var config  = require('./config');

var app = express();
app.use(express.static(__dirname + '/../build'));

module.exports = app;
var server = app.listen(config.port, function() {
    touch('.server.stamp')
});