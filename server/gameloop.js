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

/* this is the player class */
var singlePlayer = {
  active: false,
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

players.teddy = _.cloneDeep(singlePlayer);
players.mage  = _.cloneDeep(singlePlayer);

var io;

function isCollides(bounds1, bounds2) {
  if(bounds1.x + bounds1.width > bounds2.x &&
    bounds1.x < bounds2.x + bounds2.width &&
    bounds1.y + bounds1.height > bounds2.y &&
    bounds1.y < bounds2.y + bounds2.height)
    return true;
  return false;
}

function update() {
  updates = {};

  _.forOwn(players, function(player, id) {
    var change = {};

    if(player.doLeft) {
      _.merge(change, {
        bounds: { x: player.bounds.x - player.speed },
        sprite: { dir: 'left' }
      });
    }
    if(player.doUp) {
      _.merge(change, {
        bounds: { y: player.bounds.y - player.speed },
        sprite: { dir: 'up' }
      });
    }
    if(player.doRight) {
      _.merge(change, {
        bounds: { x: player.bounds.x + player.speed },
        sprite: { dir: 'right' }
      });
    }
    if(player.doDown) {
      _.merge(change, {
        bounds: { y: player.bounds.y + player.speed },
        sprite: { dir: 'down' }
      });
    }

    if(_.keys(change).length > 0) {
      _.merge(player, change);
      _.merge(getUpdates(id), change);
    }

    // collide with the walls
    _.forOwn(walls, function(wall) {
      if(isCollides(player.bounds, wall.bounds)) {
        // TODO what do we do when they collide? cancel the action?
      }
    });
  });


  if(_.keys(updates).length > 0)
    io.sockets.emit('objects-update', updates);

  setTimeout(function() { update(); }, 200);
}

var active_count = 0;

function registerClient(socket) {
  // TODO use a cookie on the client (in case they get disconnected)
  var id = _.findKey(players, { active: false });
  players[id].active = true;
  active_count++;

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
    players[id].active = false;
    active_count--;
    io.sockets.emit('objects-remove', id);
    console.log('number of players: ' + active_count);
  });

  console.log('number of players: ' + active_count);
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