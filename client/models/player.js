module.exports = [
'angular', 'object.base',
function(angular, base) {
    var model = angular.deepExtend({}, base, {
        bounds: {
            x: 10,
            y: 20,
            width: 50,
            height: 50,
        },
        render: {
            offsets: {
                y: -10,
                height: 10,
            }
        }
    });

    model.render.calc(model);

    return model;
}];