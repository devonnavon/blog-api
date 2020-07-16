import { Router } from 'express';
import { BadRequestError } from '../utils/errors';
import passport from 'passport';

const router = Router();

router.get('/', async (req, res) => {
  const posts = await req.context.models.Post.find();
  return res.send(posts);
});

router.get('/:postId', async (req, res) => {
  const post = await req.context.models.Post.findById(
    req.params.postId,
  );
  return res.send(post);
});

router.put('/:postId', async (req, res) => {
  const post = await req.context.models.Post.findById(
    req.params.postId,
  ).catch((error) => next(new BadRequestError(error)));
  post.title = req.body.title;
  post.body = req.body.body;
  post.published = req.body.published;
  await post.save();
  // .catch((error) => next(new BadRequestError(error)));
  return res.send(post);
});

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const post = await req.context.models.Post.create({
      title: req.body.title,
      body: req.body.body,
      published: req.body.published,
      user: req.user.id,
    }).catch((error) => next(new BadRequestError(error)));

    return res.send(post);
  },
);

router.delete('/:postId', async (req, res) => {
  const post = await req.context.models.Post.findById(
    req.params.postId,
  ).catch((error) => next(new BadRequestError(error)));

  if (post) {
    await post.remove();
  }

  return res.send(post);
});

export default router;

//curl -X POST -H "Content-Type:application/json" http://localhost:3000/posts -d '{"title":"yo yo yo yo", "body":"seriously though yo", "published":false}'
