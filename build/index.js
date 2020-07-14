"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("regenerator-runtime/runtime");

require("core-js/stable");

require("dotenv/config");

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("./routes"));

var _models = _interopRequireWildcard(require("./models"));

var _passport = _interopRequireDefault(require("passport"));

var _passportJwt = _interopRequireDefault(require("passport-jwt"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var JWTStrategy = _passportJwt["default"].Strategy;
var ExtractJWT = _passportJwt["default"].ExtractJwt;
var app = (0, _express["default"])(); // * Application-Level Middleware * //
// Third-Party Middleware

app.use((0, _cors["default"])()); // Built-In Middleware

app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
})); // Custom Middleware

_passport["default"].use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
}, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(jwtPayload, cb) {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models["default"].User.findByLogin(jwtPayload.username)["catch"](function (err) {
              return cb(err);
            });

          case 2:
            user = _context.sent;
            return _context.abrupt("return", cb(null, user));

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
}()));

app.use( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            req.context = {
              models: _models["default"]
            };
            next();

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}()); // * Routes * //

app.use('/login', _routes["default"].login);
app.use('/users', _routes["default"].user);
app.use('/posts', _passport["default"].authenticate('jwt', {
  session: false
}), _routes["default"].post);
app.use('/comments', _routes["default"].comment);
app.use('/session', _routes["default"].session);
app.get('*', function (req, res, next) {
  var error = new Error("".concat(req.ip, " tried to access ").concat(req.originalUrl));
  error.statusCode = 301;
  next(error);
});
app.use(function (error, req, res, next) {
  if (!error.statusCode) error.statusCode = 500;

  if (error.statusCode === 301) {
    return res.status(301).redirect('/not-found');
  }

  return res.status(error.statusCode).json({
    error: error.toString()
  });
});
var eraseDatabaseOnSync = true;
(0, _models.connectDb)().then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!eraseDatabaseOnSync) {
            _context3.next = 4;
            break;
          }

          _context3.next = 3;
          return Promise.all([_models["default"].User.deleteMany({}), _models["default"].Post.deleteMany({}), _models["default"].Comment.deleteMany({})]);

        case 3:
          seedDb();

        case 4:
          app.listen(process.env.PORT, function () {
            return console.log("Example app listening on port ".concat(process.env.PORT, "!"));
          });

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));

var seedDb = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var user1, user2, user3, post1, post2, comment1p1, comment2p1, comment3p1, comment4p1;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            user1 = new _models["default"].User({
              username: 'lord',
              password: 'qqqqq'
            });
            user2 = new _models["default"].User({
              username: 'king',
              password: 'qqqqq'
            });
            user3 = new _models["default"].User({
              username: 'john',
              password: 'qqqqq'
            });
            post1 = new _models["default"].Post({
              title: "What's going on",
              body: 'What is really going on, what is going on??',
              user: user1.id
            });
            post2 = new _models["default"].Post({
              title: 'plz comment on this',
              body: 'pleeeeaaassseee',
              user: user3.id
            });
            comment1p1 = new _models["default"].Comment({
              text: "dude idk, i've been wondering the same",
              user: user2.id,
              post: post1.id
            });
            comment2p1 = new _models["default"].Comment({
              text: 'thanks for hearing me',
              user: user1.id,
              post: post1.id
            });
            comment3p1 = new _models["default"].Comment({
              text: 'hey guys',
              user: user2.id,
              post: post1.id
            });
            comment4p1 = new _models["default"].Comment({
              text: "i'm anon bitch",
              post: post1.id
            });
            _context4.next = 11;
            return user1.save();

          case 11:
            _context4.next = 13;
            return user2.save();

          case 13:
            _context4.next = 15;
            return user3.save();

          case 15:
            _context4.next = 17;
            return post1.save();

          case 17:
            _context4.next = 19;
            return post2.save();

          case 19:
            _context4.next = 21;
            return comment1p1.save();

          case 21:
            _context4.next = 23;
            return comment2p1.save();

          case 23:
            _context4.next = 25;
            return comment3p1.save();

          case 25:
            _context4.next = 27;
            return comment4p1.save();

          case 27:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function seedDb() {
    return _ref4.apply(this, arguments);
  };
}();
//# sourceMappingURL=index.js.map