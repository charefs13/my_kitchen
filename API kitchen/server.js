const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');



const recipeRouter = require('./routers/recipeRouter');
const userRouter = require('./routers/userRouter');


const app = express();
app.use(cors());
app.use(express.json());
app.use(recipeRouter);
app.use(userRouter)





app.listen(3002, () => {

    console.log("ecoute sur le port 3002");
})

app.get("/main", (req, res) => {
    try {
        res.json("Ca marche");

    } catch (error) {
        res.json(error);
    }
})


mongoose.connect("mongodb://localhost:27017/kitchen");