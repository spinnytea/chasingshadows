var updateId = null;

var singlePlayer = {
  bounds: {
    x: 10,
    y: 10,
    width: 30,
    height: 35,
  },
  speed: 10,
  doRight: false,
  doLeft: false
};
var io;

function update() {
  if(singlePlayer.doRight)
    singlePlayer.bounds.x += singlePlayer.speed;
  if(singlePlayer.doLeft)
    singlePlayer.bounds.x -= singlePlayer.speed;

  if(singlePlayer.doRight || singlePlayer.doLeft) {
    io.sockets.emit('player-update', singlePlayer.bounds);
  }


  updateId = setTimeout(function() { update(); }, 100);
}




module.exports = {
  io: function(param) {
    io = param;
  },
  start: function() {
    update();
  },
  register: function(socket) {
    socket.on('player-action', function(data) {
      if(data.which === 'right')
        singlePlayer.doRight = (data.action === 'start');
      if(data.which === 'left')
        singlePlayer.doLeft = (data.action === 'start');
    });
    socket.on('disconnect', function() {});
  }
};