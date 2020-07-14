"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  published: {
    type: Boolean
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});
PostSchema.pre('remove', function (next) {
  this.model('Comment').deleteMany({
    post: this._id
  }, next);
});
module.exports = _mongoose["default"].model('Post', PostSchema);
//# sourceMappingURL=post.js.map