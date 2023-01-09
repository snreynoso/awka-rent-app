const btnEditUsers = document.querySelector('#btnEditUsers');

var url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:3000/api/login'
    : 'https://awka-rent-app-production.up.railway.app/api/login';

// var url = 'http://localhost:3000/api/login';

(() => {
    let role = sessionStorage.getItem('role');

    if (role === '0') {
        btnEditUsers.style.display = "";
    }
})();