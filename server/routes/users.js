import express from'express';
import User from'../models/User.js';
import bcrypt from'bcryptjs';
import jwt from'jsonwebtoken';

const router = express.Router();


// Register User
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  res.status(201).send('User registered');
});


// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied');
  try {
    const verified = jwt.verify(token, 'secretKey');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

// Mark Attendance
router.post('/attendance', verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  const today = new Date().setHours(0, 0, 0, 0);
  if (user.attendance.some(att => new Date(att.date).setHours(0, 0, 0, 0) === today)) {
    return res.status(400).send('Attendance already marked for today');
  }
  user.attendance.push({ date: new Date(), status: 'present' });
  await user.save();
  res.send('Attendance marked');
});

// View Attendance
router.get('/attendance', verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.attendance);
});

// Get Profile
router.get('/profile', verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id).select('username profilePicture');
  res.json(user);
});

// Edit Profile Picture
router.put('/profile', verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.profilePicture = req.body.profilePicture;
  await user.save();
  res.send('Profile picture updated');
});

// Send Leave Request
router.post('/leave', verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.leaves.push({ date: new Date(), status: 'pending' });
  await user.save();
  res.send('Leave request sent');
});

export default router