/* this is the base definition of an object for our game */
module.exports = [function() { return {

    // the bounds will be managed by the server
    // we will need to send and receive changes to the player's location
    bounds: {
        // these values tell us where the object is located
        x: 0,
        y: 0,

        // these tell us how big the object is
        // these probably won't change much during the game
        width: 0,
        height: 0,
    },

    // render is local data that we need to put the player on the map
    render: {
        // these are the offsets from the bounding box
        // they are static and probably based on the images
        offsets: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        },

        // these values need to be re computed when the bounds change
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        // and this function does that recomputing
        calc: function() {
            model.render.x = model.bounds.x + model.render.offsets.x;
            model.render.y = model.bounds.y + model.render.offsets.y;
            model.render.width = model.bounds.width + model.render.offsets.width;
            model.render.height = model.bounds.height + model.render.offsets.height;
        },
    },

}}];