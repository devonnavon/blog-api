import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const comments = await req.context.models.Comment.find();
  return res.send(comments);
});

router.get('/:postId', async (req, res) => {
  const comments = await req.context.models.Comment.find({
    post: req.params.postId,
  });
  return res.send(comments);
});

router.post('/:postId', async (req, res) => {
  const comment = await req.context.models.Comment.create({
    text: req.body.text,
    user: req.context.me.id,
    post: req.params.postId,
  });

  return res.send(comment);
});

router.delete('/:commentId', async (req, res) => {
  const comment = await req.context.models.Comment.findById(
    req.params.commentId,
  );

  if (comment) {
    await comment.remove();
  }

  return res.send(comment);
});

export default router;

//curl http://localhost:3000/comments
//curl http://localhost:3000/comments/5f08fd7993f784265779f6ca
//curl -X POST -H "Content-Type:application/json" http://localhost:3000/comments/5f08fd7993f784265779f6ca/ -d '{"text":"please work"}'
//curl http://localhost:3000/comments/5f08fd7993f784265779f6ca
//curl -X DELETE http://localhost:3000/comments/<>
//curl http://localhost:3000/comments/5f08fd7993f784265779f6ca
