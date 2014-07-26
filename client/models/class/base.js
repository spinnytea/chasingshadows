'use strict';

/* this is the base definition of an object for our game */
module.exports = [
function () {
  var Base = function () {
    var that = this;

    // the bounds will be managed by the server
    // we will need to send and receive changes to the player's location
    this.bounds = {
      // these values tell us where the object is located
      x:      0,
      y:      0,

      // these tell us how big the object is
      // these probably won't change much during the game
      width:  0,
      height: 0
    };

    // render is local data that we need to put the player on the map
    this.render = {
      // these are the offsets from the bounding box
      // they are static and probably based on the images
      offsets: {
        x:      0,
        y:      0,
        width:  0,
        height: 0
      },

      // these values need to be re computed when the bounds change
      x:       0,
      y:       0,
      height:  0,
      width:   0
    };

    // TODO is there a better base sprite?
    this.sprite = {
      sheet:  undefined,
      action: undefined,
      dir:    undefined,
      frame:  0,
      max_frame: 0,
      nextFrame: function() {
        that.sprite.frame++;
        if(that.sprite.frame > that.sprite.max_frame)
          that.sprite.frame = 0;
      }
    };
  };

  Base.prototype.update = function () {
    this.render.x = this.bounds.x + this.render.offsets.x;
    this.render.y = this.bounds.y + this.render.offsets.y;
    this.render.width = this.bounds.width + this.render.offsets.width;
    this.render.height = this.bounds.height + this.render.offsets.height;
  };

  return Base;
}];