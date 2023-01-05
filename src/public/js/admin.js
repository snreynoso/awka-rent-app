const btnEditUsers = document.querySelector('#btnEditUsers');

var url = 'http://localhost:3000/api/login';

(() => {
    let role = sessionStorage.getItem('role');

    if (role === '0') {
        btnEditUsers.style.display = "";
    }
})();