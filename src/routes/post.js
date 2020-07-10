import { Router } from 'express';

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

router.post('/', async (req, res) => {
  const post = await req.context.models.Post.create({
    title: req.body.title,
    body: req.body.body,
    published: req.body.published,
    user: req.context.me.id,
  });

  return res.send(post);
});

router.delete('/:postId', async (req, res) => {
  const post = await req.context.models.Post.findById(
    req.params.postId,
  );

  if (post) {
    await post.remove();
  }

  return res.send(post);
});

export default router;

//curl -X POST -H "Content-Type:application/json" http://localhost:3000/posts -d '{"title":"yo yo yo yo", "body":"seriously though yo", "published":false}'
