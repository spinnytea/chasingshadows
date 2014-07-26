'use strict';

/* this is the base definition of an object for our game */
module.exports = [
'angular',
function (angular) {
  /**
   * @param options: you can supply render offsets (options.offsets) and initial bounds (options.bounds)
   */
  var Base = function (options) {

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

    // now we update our default values based on the options we supplied
    if (angular.isDefined(options)) {
      if (angular.isDefined(options.bounds))
        angular.extend(this.bounds, options.bounds);
      if (angular.isDefined(options.offsets))
        angular.extend(this.render.offsets, options.offsets);

      // if we have supplied some values, then we need to update the render values
      this.update();
    }
  };

  Base.prototype.update = function () {
    this.render.x = this.bounds.x + this.render.offsets.x;
    this.render.y = this.bounds.y + this.render.offsets.y;
    this.render.width = this.bounds.width + this.render.offsets.width;
    this.render.height = this.bounds.height + this.render.offsets.height;
  };

  return Base;
}];