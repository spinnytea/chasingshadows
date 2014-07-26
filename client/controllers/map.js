module.exports = [
"$scope", "gameObjects",
function($scope, gameObjects) {
    $scope.objects = gameObjects.objects;

    $scope.visibleMap = {
        width: 500,
        height: 500,
    };
}];