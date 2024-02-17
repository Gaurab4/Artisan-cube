const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const KEY ='gaurabthapa'
const prisma = new PrismaClient();


// User login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });
    // If user not found, return error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    // If passwords don't match, return error
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    const token = jwt.sign({ userId: user.id }, KEY, { expiresIn: '1h' });

  
    res.status(200).json({user,token});
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// User signup endpoint
router.post('/signup', async (req, res) => {
  const { name,email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/logout', (req, res) => {
  // Clear the session or invalidate the authentication token
  // For example, if you're using JWT tokens, you might blacklist the token
  // Alternatively, clear the session if you're using session-based authentication

  // Assuming you're using cookies for authentication
  res.clearCookie('token');

  // Respond with a success message or appropriate status code
  res.status(200).json({ message: 'Logged out successfully' });
});



module.exports = router;
