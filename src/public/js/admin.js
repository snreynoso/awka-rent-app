const btnEditUsers = document.querySelector('#btnEditUsers');

(() => {
    let role = sessionStorage.getItem('role');

    if (role === '0') {
        btnEditUsers.style.display = "";
    }
})();