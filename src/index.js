import 'regenerator-runtime/runtime';
import 'core-js/stable';

import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import routes from './routes';
import models, { connectDb } from './models';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import logger from 'morgan';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const app = express();

// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors());
app.use(logger('dev'));

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    },
    async (jwtPayload, cb) => {
      const user = await models.User.findByLogin(
        jwtPayload.username,
      ).catch((err) => {
        return cb(err);
      });
      return cb(null, user);
    },
  ),
);

app.use(async (req, res, next) => {
  req.context = {
    models,
  };
  next();
});

// * Routes * //
app.use('/login', routes.login);
app.use('/users', routes.user);
app.use(
  '/posts',
  // passport.authenticate('jwt', { session: false }),
  routes.post,
);
app.use('/comments', routes.comment);
app.use('/session', routes.session);

app.get('*', function (req, res, next) {
  const error = new Error(
    `${req.ip} tried to access ${req.originalUrl}`,
  );

  error.statusCode = 301;

  next(error);
});

app.use((error, req, res, next) => {
  if (!error.statusCode) error.statusCode = 500;

  if (error.statusCode === 301) {
    return res.status(301).redirect('/not-found');
  }

  return res
    .status(error.statusCode)
    .json({ error: error.toString() });
});

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Post.deleteMany({}),
      models.Comment.deleteMany({}),
    ]);

    seedDb();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

const seedDb = async () => {
  const user1 = new models.User({
    username: 'lord',
    password: 'qqqqq',
  });

  const user2 = new models.User({
    username: 'king',
    password: 'qqqqq',
  });

  const user3 = new models.User({
    username: 'john',
    password: 'qqqqq',
  });

  const post1 = new models.Post({
    title: "What's going on",
    body: 'What is really going on, what is going on??',
    user: user1.id,
    published: true,
  });

  const post2 = new models.Post({
    title: 'plz comment on this',
    body: 'pleeeeaaassseee',
    user: user3.id,
    published: false,
  });

  const comment1p1 = new models.Comment({
    text: "dude idk, i've been wondering the same",
    user: user2.id,
    post: post1.id,
  });

  const comment2p1 = new models.Comment({
    text: 'thanks for hearing me',
    user: user1.id,
    post: post1.id,
  });

  const comment3p1 = new models.Comment({
    text: 'hey guys',
    user: user2.id,
    post: post1.id,
  });
  const comment4p1 = new models.Comment({
    text: "i'm anon bitch",
    post: post1.id,
  });

  await user1.save();
  await user2.save();
  await user3.save();

  await post1.save();
  await post2.save();

  await comment1p1.save();
  await comment2p1.save();
  await comment3p1.save();
  await comment4p1.save();
};
