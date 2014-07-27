'use strict';
var _ = require('lodash');

/* this is a list of all the players */
var players = {};
var walls = {};
//var enemies = {};

var map = {
  bounds: {
    x: 0,
    y: 0,
    width: 1000,
    height: 1000
  },
};

// create a dummy wall
walls.left = {
  bounds: {
    x: map.bounds.x-10,
    y: map.bounds.y-10,
    width: 20,
    height: map.bounds.height+20
  }
};
walls.top = {
  bounds: {
    x: map.bounds.x-10,
    y: map.bounds.y-10,
    width: map.bounds.width+20,
    height: 20
  }
};
walls.right = {
  bounds: {
    x: map.bounds.width-10,
    y: map.bounds.y-10,
    width: 20,
    height: map.bounds.height+20
  }
};
walls.bottom = {
  bounds: {
    x: map.bounds.x-10,
    y: map.bounds.height-10,
    width: map.bounds.width+20,
    height: 20
  }
};
// three random walls so we can see what's going on
walls.batoto = {
  bounds: {
    x: 400,
    y: map.bounds.y-10,
    width: 200,
    height: 100
  }
};
walls.pamana = {
  bounds: {
    x: map.bounds.x-10,
    y: 400,
    width: 100,
    height: 200
  }
};
walls.whosa = {
  bounds: {
    x: 450,
    y: 450,
    width: 300,
    height: 100
  }
};

/* this is a list of all the changes that need to be pushed to the player */
var updates = {};
function getUpdates(id) { return (updates[id] = updates[id] || {}); }
var uid = 0;
function getUID() {
  return uid++;
}

/* this is the player class */
var singlePlayer = {
  bounds: {
    x: 150,
    y: 150,
    width: 30,
    height: 35
  },
  sprite: { sheet: 'babyboy' },
  speed: 30,
  doLeft: false,
  doUp: false,
  doRight: false,
  doDown: false
};
var io;

function update() {
  updates = {};

  _.forOwn(players, function(player, id) {
    if(player.doLeft) {
      player.bounds.x -= player.speed;
      player.sprite.dir = 'left';
    }
    if(player.doUp) {
      player.bounds.y -= player.speed;
      player.sprite.dir = 'up';
    }
    if(player.doRight) {
      player.bounds.x += player.speed;
      player.sprite.dir = 'right';
    }
    if(player.doDown) {
      player.bounds.y += player.speed;
      player.sprite.dir = 'down';
    }

    if(player.doLeft || player.doUp || player.doRight || player.doDown) {
      _.merge(getUpdates(id), player);
      io.sockets.emit('player-update', player.bounds);
    }
  });


  if(_.keys(updates).length > 0)
    io.sockets.emit('objects-update', updates);

  setTimeout(function() { update(); }, 200);
}

function registerClient(socket) {
  // TODO use a cookie on the client (in case they get disconnected)
  var id = getUID();

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

  socket.emit('objects-register', players);
  socket.emit('objects-register', walls);
  socket.emit('player-id', id);

  socket.on('disconnect', function() {
    delete players[id];
    io.sockets.emit('objects-remove', id);
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