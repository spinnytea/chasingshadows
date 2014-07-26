var _ = require('lodash');

var updateId = null;

var players = {};

var singlePlayer = {
  bounds: {
    x: 150,
    y: 150,
    width: 30,
    height: 35,
  },
  speed: 10,
  doLeft: false,
  doUp: false,
  doRight: false,
  doDown: false
};
var io;

function update() {
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
      io.sockets.emit('player-update', player.bounds);
    }
  });



  updateId = setTimeout(function() { update(); }, 200);
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

  socket.on('disconnect', function() {
    delete players[id];
    console.log("number of players: " + Object.keys(players).length);
  });

  console.log("number of players: " + Object.keys(players).length);
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