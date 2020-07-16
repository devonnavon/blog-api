"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _errors = require("../utils/errors");

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
router.get('/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var posts;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return req.context.models.Post.find();

          case 2:
            posts = _context.sent;
            return _context.abrupt("return", res.send(posts));

          case 4:
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
router.get('/:postId', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var post;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return req.context.models.Post.findById(req.params.postId);

          case 2:
            post = _context2.sent;
            return _context2.abrupt("return", res.send(post));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.put('/:postId', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var post;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return req.context.models.Post.findById(req.params.postId)["catch"](function (error) {
              return next(new _errors.BadRequestError(error));
            });

          case 2:
            post = _context3.sent;
            post.title = req.body.title;
            post.body = req.body.body;
            post.published = req.body.published;
            _context3.next = 8;
            return post.save();

          case 8:
            return _context3.abrupt("return", res.send(post));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.post('/', _passport["default"].authenticate('jwt', {
  session: false
}), /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    var post;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return req.context.models.Post.create({
              title: req.body.title,
              body: req.body.body,
              published: req.body.published,
              user: req.user.id
            })["catch"](function (error) {
              return next(new _errors.BadRequestError(error));
            });

          case 2:
            post = _context4.sent;
            return _context4.abrupt("return", res.send(post));

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}());
router["delete"]('/:postId', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var post;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return req.context.models.Post.findById(req.params.postId)["catch"](function (error) {
              return next(new _errors.BadRequestError(error));
            });

          case 2:
            post = _context5.sent;

            if (!post) {
              _context5.next = 6;
              break;
            }

            _context5.next = 6;
            return post.remove();

          case 6:
            return _context5.abrupt("return", res.send(post));

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}());
var _default = router; //curl -X POST -H "Content-Type:application/json" http://localhost:3000/posts -d '{"title":"yo yo yo yo", "body":"seriously though yo", "published":false}'

exports["default"] = _default;
//# sourceMappingURL=post.js.map