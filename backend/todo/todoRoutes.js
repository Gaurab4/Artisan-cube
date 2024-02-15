// todoRoutes.js

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all todos
router.get('/todos', async (req, res) => {
    try {
        const todos = await prisma.todo.findMany();
        res.status(200).json(todos);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// Create a new todo
router.post('/todos', async (req, res) => {
  // Implement logic to create a new todo
});

// Update a todo
router.put('/todos/:id', async (req, res) => {
  // Implement logic to update a todo
});

// Delete a todo
router.delete('/todos/:id', async (req, res) => {
  // Implement logic to delete a todo
});

module.exports = router;
