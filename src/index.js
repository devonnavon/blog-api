import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import routes from './routes';
import models, { connectDb } from './models';
// import { model } from 'mongoose';

const app = express();

// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors());

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin('lord'),
  };
  next();
});

// * Routes * //
app.use('/users', routes.user);
app.use('/posts', routes.post);
app.use('/comments', routes.comment);
app.use('/session', routes.session);

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
  });

  const post2 = new models.Post({
    title: 'plz comment on this',
    body: 'pleeeeaaassseee',
    user: user3.id,
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
