"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// //passport stuff
// const passport = require("passport");
// const jwtStrategry  = require("./strategies/jwt")
// passport.use(jwtStrategry);
var router = (0, _express.Router)();
router.post('/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, username, password, user, secret, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, password = _req$body.password;
            _context.next = 3;
            return req.context.models.User.findByLogin(username);

          case 3:
            user = _context.sent;

            if (!user) {
              _context.next = 11;
              break;
            }

            _context.next = 7;
            return user.comparePassword(password);

          case 7:
            if (!_context.sent) {
              _context.next = 11;
              break;
            }

            //db calls later
            //   opts = {};
            //   opts.expiresIn = 120;
            secret = process.env.SECRET_KEY;
            token = _jsonwebtoken["default"].sign({
              username: username
            }, secret);
            return _context.abrupt("return", res.status(200).json({
              message: 'Authenticated',
              token: token
            }));

          case 11:
            return _context.abrupt("return", res.status(401).json({
              message: 'Auth Failed'
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=login.js.map