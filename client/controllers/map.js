module.exports = [
"$scope", "playerModel", "gameObjects",
function($scope, playerModel, gameObjects) {
    $scope.player = playerModel;
    $scope.objects = gameObjects.objects;

    $scope.visibleMap = {
        width: 500,
        height: 500,
    };
}];