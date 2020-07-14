import { Router } from 'express';
import { BadRequestError } from '../utils/errors';

const router = Router();

router.get('/', async (req, res) => {
  const users = await req.context.models.User.find();
  return res.send(users);
});

router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findById(
    req.params.userId,
  );
  return res.send(user);
});

router.post('/new', async (req, res) => {
  const user = await req.context.models.User.create({
    username: req.body.username,
    password: req.body.password,
  }).catch((error) => next(new BadRequestError()));
  return res.send(user);
});

export default router;
