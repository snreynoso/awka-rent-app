const btnLogIn = document.querySelector('#logInSubmit');

// var url = (window.location.hostname.includes('localhost'))
//     ? 'http://localhost:3000/'
//     : 'https://restserver-curso-fher.herokuapp.com/api/auth/google';


var url = 'http://localhost:3000/api/login';

btnLogIn.addEventListener('submit', (event) => {
    event.preventDefault();

    let formValues = [];
    const formData = new FormData(event.currentTarget);

    for (let value of formData.values()) {
        formValues.push(value);
    };

    const [email, password] = formValues;

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(resp => resp.json())
        .then(data => {
            if (data.status === 200) {
                sessionStorage.token = data.token;
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
