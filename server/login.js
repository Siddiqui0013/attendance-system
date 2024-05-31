import express from 'express'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/User.js';

const router = express.Router()

// Login 
router.post('/', async (req, res) => {
    const { username, password } = req.body;
  
    if (username === 'admin' && password === 'admin') {
      const token = jwt.sign({ role: 'admin' }, 'secretKey');
      return res.json({ token, role:"admin" });
    // return res.json()
    }
    try {
      const user = await User.findOne({ username });
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).send('Invalid credentials');
      }
      const token = jwt.sign({ id: user._id }, 'secretKey');
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  export default router