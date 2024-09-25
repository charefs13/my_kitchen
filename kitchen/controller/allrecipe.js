

const recipeSection = document.querySelector('#recipeSection');
const saveNewRecipe = document.querySelector('#saveNewRecipe');
const closeBtn = document.querySelector('.close');
const openBtn = document.querySelector('.open');
const addSection = document.querySelector('#addSection');
const sendForm = document.querySelector('#sendForm');
const displaySection = document.querySelector(".displaySection")
const myRecipeSection = document.querySelector('#myRecipe')
const allMyRecipeDiv = document.querySelector('#allMyRecipe')
const disconnectBtn = document.querySelector('#disconnect');


// SI un token est enregistrer en local storage = user connecté => execute tout mon code sinon page Login.html
if (localStorage.getItem('token')) {


    const sendSearchBtn = document.querySelector('#sendSearch');


    // FONCTION QUI RECUPERE TOUTES LES RECETTES DE LA BDD ET POUR CHACUNE DES RECETTES, j'appelle displayRecipe
    async function getAllRecipe() {
        try {

            const filterTitle = document.querySelector('#titleSearch')
            const filteringredient = document.querySelector('#ingredientSearch')
            const filtercatregory = document.querySelector('#categorySearch')


            let queryString = `?${filterTitle.value != "" ? filterTitle.name + "=" + filterTitle.value + "&&" : ""}${filteringredient.value != "" ? filteringredient.name + "=" + filteringredient.value + "&&" : ""}${filtercatregory.value != "" ? filtercatregory.name + "=" + filtercatregory.value : ""}`

            console.log(queryString);


            // Envoi de la requête GET
            const response = await fetch('http://127.0.0.1:3002/recipes/' + queryString, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + localStorage.getItem('token')

                }

            });

            // Vérification de la réponse
            if (response.ok) {
                // mise à zero du conteneur ou il y a mes recette à afficher
                recipeSection.innerHTML = ''

                // Analyse de la réponse JSON
                const data = await response.json();
                console.log("data : ")
                console.log(data);
                // remise à zero du conteneur

                recipeSection.innerHTML = ''

                // Traitement des données
                data.forEach(recipe => {
                    if (recipe.status !== 'private') {
                        displayRecipe(recipe);
                    }

                });
            } else {
                console.error("Erreur de saisie");
            }
        } catch (error) {
            console.log('erreur dans la requête')
        }
    }

    // Appel de la fonction getRecipe
    getAllRecipe();
    // bouton envoyer en cas de recherche par filtre
    sendSearchBtn.addEventListener('click', () => {
        getAllRecipe()
    })


    // Appel de la fonction getMyRecipe
    getAllRecipe();
    // bouton envoyer en cas de recherche par filtre
    sendSearchBtn.addEventListener('click', () => {
        getAllRecipe()
    })


    // FONCTION QUI CREER LES DIVS ET LES DETAILS DES RECETTES
    function displayRecipe(obj) {
        let newDiv = document.createElement('div');
        newDiv.classList.add("newDiv");

        // Titre de la recette
        let title = document.createElement('h4');
        title.innerHTML = obj.title;

        // Bouton afficher pour afficher les détails de la recette
        let displayBtn = document.createElement('button');
        displayBtn.innerHTML = "Afficher";
        displayBtn.classList.add('displayBtn');

        newDiv.appendChild(title);
        newDiv.appendChild(displayBtn);

        // Création des éléments cachés avec les détails de la recette
        let ingredient = document.createElement('p');
        ingredient.innerHTML = 'Ingredient: ' + obj.ingredient;
        ingredient.classList.add('hide');

        let instruction = document.createElement('p');
        instruction.innerHTML = "Instruction : " + obj.instruction;
        instruction.classList.add('hide');

        let preparationTime = document.createElement('p');
        preparationTime.innerHTML = "Preparation Time : " + obj.preparationTime;
        preparationTime.classList.add('hide');

        let cookingTime = document.createElement('p');
        cookingTime.innerHTML = "Cooking Time : " + obj.cookingTime;
        cookingTime.classList.add('hide');

        let difficulty = document.createElement('p');
        difficulty.innerHTML = "Difficulty : " + obj.difficulty;
        difficulty.classList.add('hide');

        let category = document.createElement('p');
        category.innerHTML = "Category : " + obj.category;
        category.classList.add('hide');

        // Bouton "Fermer"
        let hideBtn = document.createElement('button');
        hideBtn.innerHTML = 'Fermer';
        hideBtn.classList.add('hide');

        // Ajouter les détails et le bouton "Fermer"
        newDiv.appendChild(ingredient);
        newDiv.appendChild(instruction);
        newDiv.appendChild(preparationTime);
        newDiv.appendChild(cookingTime);
        newDiv.appendChild(difficulty);
        newDiv.appendChild(category);
        newDiv.appendChild(hideBtn);

        // Gestionnaire d'événement pour afficher les détails
        displayBtn.addEventListener('click', () => {
            // Affiche les détails de la recette
            ingredient.classList.remove('hide');
            instruction.classList.remove('hide');
            preparationTime.classList.remove('hide');
            cookingTime.classList.remove('hide');
            difficulty.classList.remove('hide');
            category.classList.remove('hide');

            // Affiche le bouton "Fermer"
            hideBtn.classList.remove('hide');

            // Cache le bouton "Afficher"
            displayBtn.classList.add('hide');
        });

        // Gestionnaire d'événement pour fermer les détails
        hideBtn.addEventListener('click', () => {
            // Cache les détails de la recette
            ingredient.classList.add('hide');
            instruction.classList.add('hide');
            preparationTime.classList.add('hide');
            cookingTime.classList.add('hide');
            difficulty.classList.add('hide');
            category.classList.add('hide');

            // Cache le bouton "Fermer"
            hideBtn.classList.add('hide');

            // Réaffiche le bouton "Afficher"
            displayBtn.classList.remove('hide');
        });

        // Ajout du div contenant la recette dans la section principale si la recette est publique
        if (obj.status === 'public') {
            recipeSection.appendChild(newDiv);
        }
    }




    async function deleteRecipe(id) {
        try {
            const response = await fetch("http://127.0.0.1:3002/recipes/" + id, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + localStorage.getItem('token')

                },


            })

            if (response.ok) {
                console.log("recette supprimée")
            }
            else console.log("echec suppression")
        } catch (error) {
            console.log(error)
        }
    }


}


else {
    console.log("user déconnecté")
    window.location.href = '../index.html';


}




disconnectBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    window.location.href = '../views/login.html';


})


console.log("userid connecté = " + " " + localStorage.getItem('id'))