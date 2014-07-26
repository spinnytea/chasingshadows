var _ = require('lodash');

module.exports = _.assign(_.cloneDeep(require('../config')), {
  audio_pause: false,
  show_bounding_box: false,
});