module.exports = [
"$scope", "object.player", "gameObjects",
function($scope, player, gameObjects) {
    $scope.player = player;
    $scope.objects = gameObjects.objects;

    $scope.visibleMap = {
        width: 500,
        height: 500,
    };
}];