module.exports = [
'object.class.base',
function(Base) {
    var model = new Base({
        bounds: {
            x: 140,
            y: 150,
            height: 35,
            width: 30,
        },
        offsets: {
            x: -15,
            y: -20,
            height: 25,
            width: 30,
        },
    });
    model.sprite = {
        sheet: "babyboy",
        action: "walk",
        dir: "down",
        frame: 0,

        nextFrame: function() {
            model.sprite.frame++;
            if(model.sprite.frame > 2)
                model.sprite.frame = 0;
        },
    };

    return model;
}];