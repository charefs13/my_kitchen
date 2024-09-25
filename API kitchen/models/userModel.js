const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Le nom est requis']
    },

    email: {
        type: String,
        unique: true,
        required: [true, "l'email est requis"]

    },

    password: {
        type: String,
        required: [true, "le mot de passe est requis"]
    },

    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipes'
    }]
    // Role admin/user
})

const userModel = mongoose.model('users', userSchema);


module.exports = userModel;