import { urlSelector } from "../utils/url-selector.js";

const btnLogIn = document.querySelector('#logInSubmit');

// var URL_Login = (window.location.hostname.includes('localhost'))
//     ? 'http://localhost:3000/api/login'
//     : 'https://awka-rent-app-production.up.railway.app/api/login';

// var URL_Login = 'http://localhost:3000/api/login';

const URL_Login = urlSelector('/api/login');

btnLogIn.addEventListener('submit', (event) => {
    event.preventDefault();

    let formValues = [];
    const formData = new FormData(event.currentTarget);

    for (let value of formData.values()) {
        formValues.push(value);
    };

    const [email, password] = formValues;

    fetch(URL_Login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(resp => resp.json())
        .then(data => {
            if (data.status === 200) {
                sessionStorage.token = data.token;
                sessionStorage.role  = data.role;
                window.location.href = './admin.html';
            } else if (data.status === 400) {
                alert('Invalid email and/or password');
                // console.log(data.errors);
            }
        })
        .catch(error => {
            console.log(error);
            alert('Failure server connection');
        });
});
