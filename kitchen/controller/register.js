const signInBtn = document.querySelector('#signIn');


async function sendUserIntoDb(){

    try {

        // je creer l'objet (user) avec les values de mes inputs
        let obj = {
            name: document.querySelector('#name').value,
            email: document.querySelector('#registerEmail').value,
            password: document.querySelector('#registerPassword').value
        }
        
        const response = await fetch('http://127.0.0.1:3002/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            // je post mon objet dans l'api en format json
            body: JSON.stringify(obj)

        })
        // Vérification de la réponse
        if (response.ok) {
            console.log('Utilisateur créer avec succès');
            window.location.href = './login.html';  
        } else {
            console.error("erreur");
        }
    } catch (error) {
        console.log(error)
    }

}
signInBtn.addEventListener('click' , ()=>{
    sendUserIntoDb();

})