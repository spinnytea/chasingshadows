module.exports = [
'object.base',
function(Base) {
    var model = new Base({
        bounds: {
            x: 30,
            y: 20,
            height: 10,
            width: 10,
        },
        offsets: {
            y: -10,
            height: 10,
        }
    });

    return model;
}];