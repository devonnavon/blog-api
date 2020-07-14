"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _errors = require("../utils/errors");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
router.get('/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var comments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return req.context.models.Comment.find();

          case 2:
            comments = _context.sent;
            return _context.abrupt("return", res.send(comments));

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
    var comments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return req.context.models.Comment.find({
              post: req.params.postId
            });

          case 2:
            comments = _context2.sent;
            return _context2.abrupt("return", res.send(comments));

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
router.post('/:postId', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var comment;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return req.context.models.Comment.create({
              text: req.body.text,
              user: req.user.id,
              post: req.params.postId
            })["catch"](function (error) {
              return next(new _errors.BadRequestError());
            });

          case 2:
            comment = _context3.sent;
            return _context3.abrupt("return", res.send(comment));

          case 4:
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
router["delete"]('/:commentId', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var comment;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return req.context.models.Comment.findById(req.params.commentId)["catch"](function (error) {
              return next(new _errors.BadRequestError());
            });

          case 2:
            comment = _context4.sent;

            if (!comment) {
              _context4.next = 6;
              break;
            }

            _context4.next = 6;
            return comment.remove();

          case 6:
            return _context4.abrupt("return", res.send(comment));

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = router; //curl http://localhost:3000/comments
//curl http://localhost:3000/comments/5f08fd7993f784265779f6ca
//curl -X POST -H "Content-Type:application/json" http://localhost:3000/comments/5f08fd7993f784265779f6ca/ -d '{"text":"please work"}'
//curl http://localhost:3000/comments/5f08fd7993f784265779f6ca
//curl -X DELETE http://localhost:3000/comments/<>
//curl http://localhost:3000/comments/5f08fd7993f784265779f6ca

exports["default"] = _default;
//# sourceMappingURL=comment.js.map