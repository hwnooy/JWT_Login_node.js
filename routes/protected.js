import express from 'express';
import passport from './passport.js';

const router = express.Router();

router.get('/protected', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ message: 'You have accessed a protected route!', user: req.user });
  });

export default router;
