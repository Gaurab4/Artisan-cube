// todoRoutes.js

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all todos
router.get('/todolist', async (req, res) => {
    try {
        const todos = await prisma.todoList.findMany();
        res.status(200).json(todos);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// Add a new todo
router.post('/todolist', async (req, res) => {
    const { userId, projectId, task ,name} = req.body;
    try {
        const newTodo = await prisma.todoList.create({
            data: {
                name,
                project: {
                    connect: { projectId: projectId },
                },
            },
        });
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a todo
router.put('/todolist/:id', async (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    try {
        const updatedTodo = await prisma.todoList.update({
            where: { id: parseInt(id) },
            data: { task },
        });
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a todo
router.delete('/todolist/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.todoList.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
