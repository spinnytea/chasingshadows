module.exports = [
'angular', 'object.base',
function(angular, Base) {
    var model = new Base();

    model.bounds.x = 10;
    model.bounds.y = 10;
    model.bounds.height = 50;
    model.bounds.width = 50;

    model.update();

    return model;
}];