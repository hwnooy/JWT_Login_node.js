import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { addUser, findUserByUsername } from './user.js';

const router = express.Router();

// 회원가입 API
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await addUser(username, hashedPassword);
    console.log("check+ " + newUser);
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error '});
  }
});

// 로그인 API
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (isMatch) {
      const payload = { id: user.id, username: user.username };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
      res.json({ message: 'Success', token: token });
    } else {
      res.status(400).json({ message: 'Password incorrect' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
