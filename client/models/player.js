module.exports = [function() {
    var model = {

        // the bounds will be managed by the server
        // we will need to send and receive changes to the player's location
        bounds: {
            // these values tell us where the player is located
            x: 10,
            y: 20,

            // these probably won't change much
            width: 50,
            height: 50,
        },

        // render is local data that we need to put the player on the map
        render: {
            // these values need to be re computed when the bounds change
            x: 0,
            y: 0,
            height: 0,
            width: 0,

            offsets: {
                x: 1,
                width: -2,
                y: -10,
                height: 10,
            },

            calc: function() {
                model.render.x = model.bounds.x + model.render.offsets.x;
                model.render.y = model.bounds.y + model.render.offsets.y;
                model.render.width = model.bounds.width + model.render.offsets.width;
                model.render.height = model.bounds.height + model.render.offsets.height;
            },
        },
    };

    model.render.calc();

    return model;
}];