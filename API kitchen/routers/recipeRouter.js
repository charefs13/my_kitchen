
const recipeModel = require('../models/recipeModel');
const recipeRouter = require('express').Router();
const userModel = require('../models/userModel');
const authguard = require("../middlewares/authguard")

// CREATE

recipeRouter.post('/recipes', authguard, async (req, res) => {
    try {
        const newRecipe = new recipeModel({
            ...req.body,
            userId: req.userid
        });
        await newRecipe.save();
        await userModel.updateOne({ _id: req.userid }, { $push: { recipes: newRecipe._id } }); 
        res.json(newRecipe)
    } catch (error) {
        res.json(error.message)
    }
});


// READ

//get all recipes || get recipes according to req.query

recipeRouter.get('/recipes', authguard, async (req, res) => {
    try {
        const recipes = await recipeModel.find(req.query);
        res.json(recipes);
    } catch (error) {
        res.json(error);
    }
})

// get recipe by Id

recipeRouter.get('/recipes/:id', authguard, async (req, res) => {
    try {
        const recipe = await recipeModel.findOne({ _id: req.params.id });
        res.json(recipe);
    } catch (error) {
        res.json(error);
    }
});


// UPDATE


recipeRouter.put('/recipes/:id', authguard, async (req, res) => {
    try {
        await recipeModel.updateOne({ _id: req.params.id }, req.body);
        res.json({ message: "La recette a bien été modifiée." });
    } catch (error) {
        res.json(error);
    }
});


// DELETE

recipeRouter.delete('/recipes/:id', authguard, async (req, res) => {

    try {
        const recipe = await recipeModel.deleteOne({ _id: req.params.id });
        res.json({ message: "La recette a été supprimé avec succès" });

    } catch (error) {
        res.json(error);
    }
});



module.exports = recipeRouter;