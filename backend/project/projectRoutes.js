const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create a new project
router.post('/project', async (req, res) => {
    try {
        console.log(req.body.userID)
        
        const project = await prisma.project.create({
            data: {
                name: req.body.name,
                user: { connect: { id: req.body.userID } }
            },
        });
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get projects for the current user
router.get('/project', async (req, res) => {
    try {
        // Get projects associated with the current user
        const projects = await prisma.project.findMany({
            where: {
                userId: req.body.userID
            }
        });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Update a project
router.put('/project/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProject = await prisma.project.update({
            where: {
                id: id
            },
            data: {
                name: req.body.name
            }
        });
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Delete a project
router.delete('/project/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.project.delete({
            where: {
                id: id
            }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;
