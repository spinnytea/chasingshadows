module.exports = [
"$scope", "$timeout", "audioContext", "socket", "config", "object.player",
function($scope, $timeout, audio, socket, config, player) {
    $scope.player = player;
    $scope.show_bounds = config.show_bounding_box;

    function spriteCycle() {
        $timeout(function() {
            player.sprite.nextFrame();
            spriteCycle();
        }, 200)
    }
    spriteCycle();

    var paused = false;
    function togglePause() {
        paused = !paused;
        if(paused) {
            audio.bgmusic.pause();
        } else {
            audio.bgmusic.play();
        }
    }
    $scope.isPaused = function() {
        return paused;
    };

    $scope.keys = {
      left: false,
      right: false,
      up: false,
      down: false,
      pause: false,
      attack: false,
    };

    /* keys are captured in the root panel because we want to them to be app wide */
    /* if we want to add forms to the page, then we will need to move these */
    $scope.onKeyDown = function(event) {
        event.preventDefault();

        // left, up, right, down, p
        // 37,   38, 38,    40,   80
        switch(event.keyCode) {
            case 37:
                if($scope.keys.left == false)
                    socket.emit("player-action", { action: 'start', which: 'left' });
                $scope.keys.left = true;
                player.sprite.dir = "left";
                break;
            case 38:
                if($scope.keys.up == false)
                    socket.emit("player-action", { action: 'start', which: 'up' });
                $scope.keys.up = true;
                player.sprite.dir = "up";
                break;
            case 39:
                if($scope.keys.right == false)
                    socket.emit("player-action", { action: 'start', which: 'right' });
                $scope.keys.right = true;
                player.sprite.dir = "right";
                break;
            case 40:
                if($scope.keys.down == false)
                    socket.emit("player-action", { action: 'start', which: 'down' });
                $scope.keys.down = true;
                player.sprite.dir = "down";
                break;
            case 80:
                togglePause();
                break;
            default:
                console.log(event.keyCode);
        }
    }
    $scope.onKeyUp = function(event) {
        event.preventDefault();

        switch(event.keyCode) {
            case 37:
                socket.emit("player-action", { action: 'end', which: 'left' });
                $scope.keys.left = false;
                break;
            case 38:
                socket.emit("player-action", { action: 'end', which: 'up' });
                $scope.keys.up = false;
                break;
            case 39:
                socket.emit("player-action", { action: 'end', which: 'right' });
                $scope.keys.right = false;
                break;
            case 40:
                socket.emit("player-action", { action: 'end', which: 'down' });
                $scope.keys.down = false;
                break;
        }
    }
}];