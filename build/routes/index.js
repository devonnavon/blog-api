"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("./user"));

var _post = _interopRequireDefault(require("./post"));

var _comment = _interopRequireDefault(require("./comment"));

var _session = _interopRequireDefault(require("./session"));

var _login = _interopRequireDefault(require("./login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  user: _user["default"],
  post: _post["default"],
  comment: _comment["default"],
  session: _session["default"],
  login: _login["default"]
};
exports["default"] = _default;
//# sourceMappingURL=index.js.map