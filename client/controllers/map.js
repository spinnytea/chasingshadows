'use strict';

module.exports = [
'angular', '$scope', 'gameObjects', 'socket',
function(angular, $scope, gameObjects, socket) {
  $scope.objects = gameObjects.objects;
  $scope.visibleMap = {
    width: 500,
    height: 500
  };

  socket.on('player-id', function(data) {
    $scope.follow = data;
    socket.on('disconnect', function() {
      delete $scope.objects[$scope.follow];
      delete $scope.follow;
      console.log('disconnected');
    });
  });

  $scope.getCameraX = function() {
    if(angular.isDefined($scope.follow)) {
      var folobj = $scope.objects[$scope.follow];
      var offset = folobj.bounds.x - ($scope.visibleMap.width-folobj.bounds.width)/2;
      offset = Math.max(offset, 0);
      offset = Math.min(offset, $scope.visibleMap.width);
      return offset;
    }
    return 0;
  };
  $scope.getCameraY = function() {
    if(angular.isDefined($scope.follow)) {
      var folobj = $scope.objects[$scope.follow];
      var offset = folobj.bounds.y - ($scope.visibleMap.height-folobj.bounds.height)/2;
      offset = Math.max(offset, 0);
      offset = Math.min(offset, $scope.visibleMap.height);
      return offset;
    }
    return 0;
  };
}];