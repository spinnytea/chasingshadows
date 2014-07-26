module.exports = [
"$scope", "playerModel",
function($scope, playerModel) {
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

        playerModel.x += 10;

        // TODO send updates to server
    }
    $scope.onKeyUp = function(event) {
        event.preventDefault();
        console.log(event);

        // TODO send updates to server
    }
}];