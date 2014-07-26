var _ = require('lodash');
var touch = require('touch');
var express = require('express');
var config  = require('./config');
var socketio = require('socket.io');

var app = express();
app.use(express.static(__dirname + '/../build'));

module.exports = app;
var server = app.listen(config.port, function() {
  touch('.server.stamp');
});

socketio(server).on('connection', function(socket) {
  console.log("a user has connected");
  socket.on('player-action', function(data) {
    console.log(data);
  });
  socket.on('disconnect', function() {});
});