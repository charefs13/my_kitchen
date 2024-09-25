const userModel = require('../models/userModel');
const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authguard = require('../middlewares/authguard');
const saltRounds = 10;

// CREATE (Inscription d'un utilisateur)
userRouter.post('/register', async (req, res) => {
    try {
        const { name, email, password, } = req.body;


        // Hacher le mot de passe avant de créer l'utilisateur
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        // Créer un nouvel utilisateur avec le mot de passe haché
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        // Sauvegarder l'utilisateur dans la base de données
        await newUser.save();

        // Réponse en JSON après la création de l'utilisateur
        res.json(newUser);
    } catch (error) {
        // Gestion des erreurs
        res.json(error);
    }
});

// 

// LOGIN

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Rechercher l'utilisateur dans la base de données par son email
        const user = await userModel.findOne({ email });

        // Si l'utilisateur n'existe pas
        if (!user) {
         res.json({ message: 'Utilisateur introuvable' });
        }

        // Comparer le mot de passe fourni avec celui haché dans la base de données
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Si les mots de passe correspondent
            const token = jwt.sign({ userid: user._id }, "cryptKey");


            res.json({ token: token, userid: user._id });
        } else {
            // Si le mot de passe est incorrect
            res.json({ message: 'Mot de passe incorrect' });
        }
    } catch (error) {
        // Gestion des erreurs
        res.json(error);
    }

});

// READ

userRouter.get('/users', async (req, res) => {
    const users = await userModel.find()
    res.json(users)
})


//DELETE 

userRouter.delete('/users/:name', async (req, res) => {
    const user = await userModel.deleteOne({ name: req.params.name })
    res.json({ message: "User supprimé" })
})


//Quand un user post une recette

userRouter.put('/users/:id', authguard, async (req, res) => {
    try {
        await userModel.updateOne({ _id: req.params.id }, { recipe: req.recipe.recipeid });
        res.json({ message: "recette ajouté au user" });
    } catch (error) {
        res.json(error);
    }

})

module.exports = userRouter;


