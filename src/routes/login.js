import { Router } from 'express';
import jwt from 'jsonwebtoken';

// //passport stuff
// const passport = require("passport");
// const jwtStrategry  = require("./strategies/jwt")
// passport.use(jwtStrategry);

const router = Router();

router.post('/', async (req, res) => {
  let { username, password } = req.body;
  const user = await req.context.models.User.findByLogin(username);
  if (user) {
    if (await user.comparePassword(password)) {
      //db calls later
      //   opts = {};
      //   opts.expiresIn = 120;
      const secret = process.env.SECRET_KEY;
      const token = jwt.sign({ username }, secret);
      return res.status(200).json({
        message: 'Authenticated',
        token,
      });
    }
  }
  return res.status(401).json({ message: 'Auth Failed' });
});

export default router;
