// todoRoutes.js

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all todos
router.get('/todolist', async (req, res) => {
    try {
        const projectId = req.query.projectId;
       
        const todos = await prisma.todoList.findMany({
            where: {
                projectId: projectId,
              },
        });
        res.status(200).json(todos);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});


router.post('/todolist', async (req, res) => {
  
    const { userId, projectId, task ,name} = req.body;
    console.log("todo... ", name , projectId);
    try {
        const newTodoList = await prisma.todoList.create({
            data: {
                name: name,
                projectId: projectId,   
            },
        });
        res.status(201).json(newTodoList);
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
