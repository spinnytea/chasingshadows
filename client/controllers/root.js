module.exports = [
"$scope", "audioContext",
function($scope, audio) {

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
    };

    /* keys are captured in the root panel because we want to them to be app wide */
    /* if we want to add forms to the page, then we will need to move these */
    $scope.onKeyDown = function(event) {
        event.preventDefault();

        // left, up, right, down, p
        // 37,   38, 38,    40,   80
        switch(event.keyCode) {
            case 37:
                $scope.keys.left = true;
                break;
            case 38:
                $scope.keys.up = true;
                break;
            case 39:
                $scope.keys.right = true;
                break;
            case 40:
                $scope.keys.down = true;
                break;
            case 80:
                togglePause();
                break;
            default:
                console.log(event.keyCode);
        }

        // TODO send updates to server
    }
    $scope.onKeyUp = function(event) {
        event.preventDefault();

        switch(event.keyCode) {
            case 37:
                $scope.keys.left = false;
                break;
            case 38:
                $scope.keys.up = false;
                break;
            case 39:
                $scope.keys.right = false;
                break;
            case 40:
                $scope.keys.down = false;
                break;
        }

        // TODO send updates to server
    }
}];