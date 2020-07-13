import { Router } from 'express';

//jwt stuff

import jwt from 'jsonwebtoken';
import passport from 'passport';

// //passport stuff
// const passport = require("passport");
// const jwtStrategry  = require("./strategies/jwt")
// passport.use(jwtStrategry);

const router = Router();

router.post('/', async (req, res) => {
  let { username, password } = req.body;
  if (username === 'lord') {
    if (password === 'q') {
      //db calls later
      //   opts = {};
      //   opts.expiresIn = 120;
      const secret = 'SECRET_KEY';
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
