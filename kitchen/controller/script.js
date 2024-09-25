
const recipeSection = document.querySelector('#recipeSection');
const saveNewRecipe = document.querySelector('#saveNewRecipe');
const closeBtn = document.querySelector('.close');
const openBtn = document.querySelector('.open');
const addSection = document.querySelector('#addSection');
const sendForm = document.querySelector('#sendForm');
const myRecipeSection = document.querySelector('#myRecipe');
const allMyRecipeDiv = document.querySelector('#allMyRecipe');
const disconnectBtn = document.querySelector('#disconnect');
const sendSearchBtn = document.querySelector('#sendSearch');





// SI un token est enregistrer en local storage = user connecté => execute tout mon code sinon page Login.html
if (localStorage.getItem('token')) {


    // OUVRE MA MODALE PR AJOUTER UNE RECETTE
    openBtn.addEventListener('click', () => {
        sendForm.style.display = 'flex';
        openBtn.style.display = "none";

    })

    // FERME MA MODALE PR AJOUTER UNE RECETTE
    closeBtn.addEventListener('click', () => {
        sendForm.style.display = 'none';
        openBtn.style.display = "block";
        displaySection.style.display = "block"
    })



    //  CREATION DE LA FONCTION QUI ENVOIE DE LA NOUVELLE RECETTE DANS LA BDD
    async function sendRecipeIntoDb() {

        try {

            // je récupère la valeur du champ ingredient,
            // je separe chaque mot et les stock dans un tableau

            let ingredient = document.querySelector("#ingredient").value;
            let splitIngredient = ingredient.split(/[\s,\.]+/);
            let ingredientArray = []
            splitIngredient.forEach(word => {
                ingredientArray.push(word);
            })

            // Création de l'objet avec les données du formulaire
            let obj = {
                title: document.querySelector('#title').value,
                ingredient: ingredientArray, // la clé ingredient à comme valeur mon tableau d'ingredients créer ci dessus
                instruction: document.querySelector('#instruction').value,
                preparationTime: document.querySelector('#preparationTime').value,
                cookingTime: document.querySelector('#cookingTime').value,
                difficulty: document.querySelector('#difficulty').value,
                category: document.querySelector('#category').value,
                status: document.querySelector('#status').value

            };

            // Envoi de la requête POST
            const response = await fetch("http://127.0.0.1:3002/recipes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + localStorage.getItem('token')
                },
                body: JSON.stringify(obj)
            });

            // Vérification de la réponse
            if (response.ok) {
                console.log('Recette ajoutée avec succès');
                window.location.reload();

            } else {
                const errorData = await response.json();
                console.error('Erreur lors de la création de la recette:', errorData);
            }
        } catch (error) {
            console.log('erreur, la creation de la recette a échoué')
        }
    }

    // APPEL DE MA FONCTION sendRecipe au click du boutton SaveNewRecipe
    saveNewRecipe.addEventListener('click', () => {
        sendRecipeIntoDb();
        sendForm.style.display = 'none';
        openBtn.style.display = "block";
        getAllRecipe
    });




    // FONCTION QUI RECUPERE TOUTES LES RECETTES DE LA BDD ET POUR CHACUNE DES RECETTES, j'appelle displayRecipe
    async function getAllRecipe() {
        try {

            const filterTitle = document.querySelector('#titleSearch')
            const filteringredient = document.querySelector('#ingredientSearch')
            const filtercatregory = document.querySelector('#categorySearch')


            let queryString = `?${filterTitle.value != "" ? filterTitle.name + "=" + filterTitle.value + "&&" : ""}${filteringredient.value != "" ? filteringredient.name + "=" + filteringredient.value + "&&" : ""}${filtercatregory.value != "" ? filtercatregory.name + "=" + filtercatregory.value : ""}`



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
                allMyRecipeDiv.innerHTML = ''
                // Analyse de la réponse JSON
                const data = await response.json();
                console.log("data : ")
                console.log(data);
                // remise à zero du conteneur
                allMyRecipeDiv.innerHTML = ''

                // Traitement des données
                data.forEach(recipe => {

                    if (localStorage.getItem('id') == recipe.userId) {
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


    // FONCTION QUI CREER LES DIVS ET LES DETAILS DES RECETTES
    function displayRecipe(obj) {
        // console.log(obj)
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
        ingredient.innerHTML = 'Ingredients: ' + obj.ingredient.join(', ');
        ingredient.classList.add('hide');

        let instruction = document.createElement('p');
        instruction.innerHTML = "Instructions: " + obj.instruction;
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

        let status = document.createElement('p');
        status.innerHTML = "status : " + obj.status;
        status.classList.add('hide');

        // Création des boutons "Fermer", "Supprimer", "Modifier"
        let hideBtn = document.createElement('button');
        hideBtn.innerHTML = 'Fermer';
        hideBtn.classList.add('hide');

        let deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'Supprimer';
        deleteBtn.classList.add('hide');

        let updateBtn = document.createElement('button');
        updateBtn.innerHTML = 'Modifier';
        updateBtn.classList.add('hide');

        // Création du formulaire de modification
        let updateForm = document.createElement('form');
        updateForm.classList.add("updateForm");
        updateForm.style.display = "none"; // Initialement caché

        // Champs du formulaire de modification
        let updateTitle = document.createElement("input");
        updateTitle.placeholder = obj.title;

        let updateIngredient = document.createElement("textarea");
        updateIngredient.placeholder = obj.ingredient.join(", ");

        let updateInstruction = document.createElement("textarea");
        updateInstruction.placeholder = obj.instruction;

        let updatePreparationTime = document.createElement("input");
        updatePreparationTime.placeholder = obj.preparationTime;

        let updateCookingTime = document.createElement("input");
        updateCookingTime.placeholder = obj.cookingTime;

        let updateDifficulty = document.createElement("input");
        updateDifficulty.placeholder = obj.difficulty;

        let updateCategory = document.createElement("input");
        updateCategory.placeholder = obj.category;

        let updateStatus = document.createElement("input");
        updateStatus.placeholder = obj.status;

        // Bouton pour envoyer les modifications
        let sendUpdateBtn = document.createElement("button");
        sendUpdateBtn.innerHTML = "Enregistrer les modifications";

        // Ajout des champs et du bouton d'envoi au formulaire
        updateForm.appendChild(updateTitle);
        updateForm.appendChild(updateIngredient);
        updateForm.appendChild(updateInstruction);
        updateForm.appendChild(updatePreparationTime);
        updateForm.appendChild(updateCookingTime);
        updateForm.appendChild(updateDifficulty);
        updateForm.appendChild(updateCategory);
        updateForm.appendChild(updateStatus);
        updateForm.appendChild(sendUpdateBtn);

        // Ajout du formulaire au div principal
        newDiv.appendChild(updateForm);

        // Gestion du bouton "Modifier"
        updateBtn.addEventListener('click', () => {
            // Cache les détails de la recette
            ingredient.classList.add('hide');
            instruction.classList.add('hide');
            preparationTime.classList.add('hide');
            cookingTime.classList.add('hide');
            difficulty.classList.add('hide');
            category.classList.add('hide');
            status.classList.add('hide');


            // Cache le bouton "Afficher"
            displayBtn.classList.add('hide');

            // Affiche le formulaire de modification
            updateForm.style.display = 'block';
            hideBtn.classList.remove('hide');
            deleteBtn.classList.remove('hide');
            updateBtn.classList.add('hide'); // Cache le bouton "Modifier" pendant l'édition
        });

        // Appelle la fonction deleteRecipe au clic du bouton "Supprimer"
        deleteBtn.addEventListener("click", () => {
            newDiv.remove(); // Supprime l'élément du DOM
            deleteRecipe(obj._id); // Appelle la fonction pour supprimer la recette sur le backend
        });

        // Gestionnaire d'événement pour afficher les détails
        displayBtn.addEventListener('click', () => {
            // Affiche les détails de la recette
            ingredient.classList.remove('hide');
            instruction.classList.remove('hide');
            preparationTime.classList.remove('hide');
            cookingTime.classList.remove('hide');
            difficulty.classList.remove('hide');
            category.classList.remove('hide');
            status.classList.remove('hide');


            // Affiche les boutons associés
            hideBtn.classList.remove('hide');
            deleteBtn.classList.remove('hide');
            updateBtn.classList.remove('hide');

            // Cache le bouton "Afficher"
            displayBtn.classList.add('hide');

            // Ajout des détails et des boutons "Fermer", "Supprimer", "Modifier" au div
            newDiv.appendChild(ingredient);
            newDiv.appendChild(instruction);
            newDiv.appendChild(preparationTime);
            newDiv.appendChild(cookingTime);
            newDiv.appendChild(difficulty);
            newDiv.appendChild(category);
            newDiv.appendChild(status);

            newDiv.appendChild(hideBtn);
            newDiv.appendChild(deleteBtn);
            newDiv.appendChild(updateBtn);
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
            status.classList.add('hide');


            // Cache les boutons "Fermer", "Modifier", et "Supprimer"
            hideBtn.classList.add('hide');
            deleteBtn.classList.add('hide');
            updateBtn.classList.add('hide');
            updateForm.style.display = 'none'; // Cache le formulaire de modification

            // Réaffiche le bouton "Afficher"
            displayBtn.classList.remove('hide');
        });

        // Gestionnaire d'événement pour enregistrer les modifications
        sendUpdateBtn.addEventListener('click', async () => {

            // je créer un tableau d'ingredient vide
            let ingredientArray = []


            // si le champs d'updateIngredient est difféerent du tableau d'ingredient de la bdd
            // Je créer un nouveau tableau d'ingrédient et je push dedans chaque ingrédient grace au split 
            if (updateIngredient.value != [""]) {

                console.log("obj.ingredient: " + obj.ingredient)
                ingredientArray = []
                let ingredient = updateIngredient.value
                let splitIngredient = ingredient.split(", ");
                splitIngredient.forEach(word => {
                    ingredientArray.push(word);
                })

            }
            // s'il n'est pas différent (donc les ingrédients n'ont pas été modifier) 
            // je reprend le tableau d'ingredient existant
            else {
                ingredientArray = []
                let ingredient = obj.ingredient.join(', ')
                let splitIngredient = ingredient.split(", ");
                splitIngredient.forEach(word => {
                    ingredientArray.push(word);
                })

            }


            // je créer un nouveau tableau avec les champs des updateInputs et je le renvoie en methode Put 
            let updatedRecipe = {
                title: updateTitle.value || obj.title,
                ingredient: ingredientArray,
                instruction: updateInstruction.value || obj.instruction,
                preparationTime: updatePreparationTime.value || obj.preparationTime,
                cookingTime: updateCookingTime.value || obj.cookingTime,
                difficulty: updateDifficulty.value || obj.difficulty,
                status: updateStatus.value || obj.status,
                category: updateCategory.value || obj.category
            }


            try {
                const response = await fetch("http://127.0.0.1:3002/recipes/" + obj._id, {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json",
                        "authorization": "Bearer " + localStorage.getItem('token')

                    },
                    body: JSON.stringify(updatedRecipe)
                })
                if (response.ok) {
                    console.log("recette modifiée")
                    window.location.reload();

                }
                else console.log("echec modification")

            } catch (error) {
                console.log(error)

            }

        });

        // Ajout du div contenant la recette dans la section principale
        allMyRecipeDiv.appendChild(newDiv);

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
    window.location.href = '../views/login.html';
}



disconnectBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');

    window.location.href = '../views/login.html';


})


console.log("userid connecté = " + " " + localStorage.getItem('id'))