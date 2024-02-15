// authRoutes.js

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Register route
router.post('/register', async (req, res) => {
  try {
    const newUser = await prisma.authUser.create({
      data: {
        email: req.body.email,
        password: req.body.password,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        res.status(200).json({message : 'Api is working '});
    } catch (error) {
        res.status(500).json({message : 'there is an error connecting to the db'});
    }
});

module.exports = router;
