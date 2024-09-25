const loginBtn = document.querySelector('#login');

async function login() {
    try {
        let obj = {
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value
        };
        const response = await fetch('http://127.0.0.1:3002/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
                
            },
            body: JSON.stringify(obj)

        })
        // Vérification de la réponse
        if (response.ok) {
            console.log('Connection réussie');
            const data = await response.json()
            console.log(data)
            if(data.token){
                localStorage.setItem('token',data.token)
                localStorage.setItem('id', data.userid)
                window.location.href = '../index.html';  

            }
            

        } else {
            console.error("erreur");
        }
    } catch (error) {
        console.log(error.message)
    }

}

loginBtn.addEventListener('click' , ()=>{
    login();

})