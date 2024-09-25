const mongoose = require('mongoose');




const recipeSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Le titre est requis"]
    },

    ingredient: [{
        type: String
    }],
    instruction: {
        type: String,
        required: [true, "Le titre est requis"]
    },

    preparationTime: {
        type: String,
        required: [true, "Le temps de preparation est requis"]
    },
    cookingTime: {
        type: String,
        required: [true, "Le temps de cuisson est requis"]
    },

    difficulty:
    {
        type: String,
        required: [true, "La difficulté est requise"]

    },
    category: {
        type: String,
        required: [true, "La catégorie est requise"]
    },

    status: {
        type: String,
        required: [true, 'Vous devez choisir le status  de la recette']
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
    },
    image: {
        type: String
    }

})

const recipeModel = mongoose.model('recipes', recipeSchema);


module.exports = recipeModel;