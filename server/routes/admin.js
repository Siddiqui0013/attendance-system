import express from'express';
import User from'../models/User.js';
import jwt from'jsonwebtoken';

const router = express.Router();

// Middleware to verify admin token
const verifyAdmin = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied');
  try {
    const verified = jwt.verify(token, 'secretKey');
    if (verified.role !== 'admin') return res.status(403).send('Forbidden');
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

// View All Users
// router.get('/users', async (req, res) => {
router.get('/users', verifyAdmin, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Edit, Add, Delete Attendance
// router.put('/attendance/:userId', verifyAdmin, async (req, res) => {
//   const user = await User.findById(req.params.userId);
//   user.attendance = req.body.attendance;
//   await user.save();
//   res.send('Attendance updated');
// });

// Generate Report

router.get('/report', verifyAdmin, async (req, res) => {
  // router.get('/report', async (req, res) => {
  const { from, to } = req.query;
  const users = await User.find();
  const report = users.map(user => {
    // const attendanceInRange = user.attendance.filter(att => new Date(att.date) >= new Date(from) && new Date(att.date) <= new Date(to));
    const attendanceInRange = user.attendance.filter(att => {
      const attendanceDate = new Date(att.date); // Explicit conversion
      return attendanceDate >= new Date(from) && attendanceDate <= new Date(to);
    });
    
    return {
      username: user.username,
      attendance: attendanceInRange
    };
  });
  res.json(report);
});
 

 

// Leave Approval Module
// router.put('/leave/:userId', verifyAdmin, async (req, res) => {
//   const user = await User.findById(req.params.userId);
//   const leave = user.leaves.id(req.body.leaveId);
//   leave.status = req.body.status;
//   await user.save();
//   res.send('Leave status updated');
// });

export default router
