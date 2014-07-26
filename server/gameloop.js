'use strict';
var _ = require('lodash');

/* this is a list of all the players */
var players = {};
var walls = {};
//var enemies = {};

// create a dummy wall
walls.first = {
  x: 10,
  y: 10,
  width: 20,
  height: 20
};
walls.second = {
  x: 300,
  y: 300,
  width: 50,
  height: 50
};

/* this is a list of all the changes that need to be pushed to the player */
var updates = {};
function getUpdates(id) { return (updates[id] = updates[id] || {}); }

/* this is the player class */
var singlePlayer = {
  bounds: {
    x: 150,
    y: 150,
    width: 30,
    height: 35
  },
  speed: 10,
  doLeft: false,
  doUp: false,
  doRight: false,
  doDown: false
};
var io;

function update() {
  updates = {};

  _.forOwn(players, function(player, id) {
    if(player.doLeft)
      player.bounds.x -= player.speed;
    if(player.doUp)
      player.bounds.y -= player.speed;
    if(player.doRight)
      player.bounds.x += player.speed;
    if(player.doDown)
      player.bounds.y += player.speed;

    if(player.doLeft || player.doUp || player.doRight || player.doDown) {
      _.merge(getUpdates(id), player.bounds);
      io.sockets.emit('player-update', player.bounds);
    }
  });


  if(_.keys(updates).length > 0)
    io.sockets.emit('update-objects', updates);

  setTimeout(function() { update(); }, 200);
}

function registerClient(socket) {
  // TODO use a cookie on the client (in case they get disconnected)
  var id = socket.id;

  players[id] = _.cloneDeep(singlePlayer);

  socket.on('player-action', function(data) {
    if(data.which === 'left')
      players[id].doLeft = (data.action === 'start');
    if(data.which === 'up')
      players[id].doUp = (data.action === 'start');
    if(data.which === 'right')
      players[id].doRight = (data.action === 'start');
    if(data.which === 'down')
      players[id].doDown = (data.action === 'start');
  });

  socket.emit('objects-register', walls);

  socket.on('disconnect', function() {
    delete players[id];
    console.log('number of players: ' + Object.keys(players).length);
  });

  console.log('number of players: ' + Object.keys(players).length);
}

module.exports = {
  io: function(param) {
    io = param;

    io.on('connection', function(socket) {
      registerClient(socket);
    });
  },

  start: function() {
    update();
  },
};