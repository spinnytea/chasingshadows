var _ = require('lodash');
var angular = require('angular');

angular.deepExtend = function(dst) {
    angular.forEach(arguments, function(obj) {
        angular.forEach(obj, function(value, key) {
            if(!angular.isDefined(dst[key]))
                dst[key] = angular.copy(value);
            else if(angular.isObject(value))
                angular.deepExtend(dst[key], value);
            else
                dst[key] = value;
        });
    });
    return dst;
}

var app = angular.module('chasingshadows', []);

app.value('angular', angular);
app.factory('playerModel', require('./models/player'));
app.factory('gameObjects', require('./models/gameObjects'));
app.factory('object.base', require('./models/objects/base'));

app.controller('rootController', require("./controllers/root"));
app.controller('mapController', require("./controllers/map"));
