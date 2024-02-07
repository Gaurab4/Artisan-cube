const express = require('express');
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();


// json 
app.use(express.json());



// core 

app.use((req, res ,next ) => {
    res.setHeader('Access-Control-Allow-Origin' , '*');
    res.setHeader('Access-Control-Allow-Methods' , 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// testing api with error 
app.get('/test' , (req,res) => {
try {
    res.status(200).json({message : 'Api is working '});
} catch (error) {
    res.status(500).json({message : 'there is an error connecting to the db'});
}
});

// getting all the users 

app.get('/users' , async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users); 
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// get user by id 

app.get('/users/:id', async (req, res) =>{
    try{
        const user = await prisma.user.findUnique({
            where:{
                id: Number(req.params.id),
            },
        });
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

// creating a user 
app.post('/users' , async (req, res) => {
    try {
        const users = await prisma.user.create({
            data:{
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            },
        });
        res.status(201).json(users); 
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});


// update 

// delete


// start the server 

const PORT = process.env.PORT || 4000;
app.listen(PORT , () => console.log(`server is running on port ${PORT}`));
