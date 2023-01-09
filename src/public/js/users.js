
(() => {
    let role = sessionStorage.getItem('role');

    if (role !== '0') {
        console.log('Is not Admin')
        window.location.href = './index.html';
    }
})();

const URL_GetAllUsers = 'http://localhost:3000/api/user/get-all';
const URL_GetUserById = 'http://localhost:3000/api/user/get';
const URL_CreateUser = 'http://localhost:3000/api/user/create';
const URL_DeleteUser = 'http://localhost:3000/api/user/delete';

const usersList = document.querySelector('#users');
const userForm = document.querySelector('#userForm');

const user_name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const role = document.querySelector('#role');

const getUsergById = userId => {
    fetch(URL_GetUserById, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.token
        },
        body: JSON.stringify({ id: userId })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => console.log(error));
};

const deleteUser = userId => {
    fetch(URL_DeleteUser, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.token
        },
        body: JSON.stringify({ id: userId })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => console.log(error));

    renderUsers();
};

const usersListUI = user => {
    const div = document.createElement('div');
    let userRole = '';

    switch (user.role) {
        case 0:
            userRole = 'Super Admin';
            break;
        case 1:
            userRole = 'Admin';
            break;

        default:
            userRole = 'User';
            break;
    };

    div.innerHTML = `
        <div class="row container rounded-2 border m-0 mt-1 p-2 d-flex justify-content-evenly">
            <div class="col-md-2">
                <p>Name: ${user.name}</p>
            </div>
            
            <div class="col-md-2">
                <p>Email: ${user.email}</p>
            </div>

            <div class="col-md-2">
                <p>Role: ${userRole}</p>
            </div>
                
            <div class="col-md-3 ">
                <div class="d-flex justify-content-md-evenly">
                    <button class="update btn btn-primary" data-id="${user._id}">Update</button>
                    <button class="delete btn btn-danger ms-2" data-id="${user._id}">Delete</button>
                </div>
            </div>
        </div>
    `;

    const btnUpdate = div.querySelector('.update');
    btnUpdate.addEventListener('click', e => getUsergById(btnUpdate.dataset.id));

    const btnDelete = div.querySelector('.delete');
    btnDelete.addEventListener('click', e => deleteUser(btnDelete.dataset.id));

    return div;
};

const renderUsers = () => {
    usersList.innerHTML = '';

    fetch(URL_GetAllUsers, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.token
        }
    })
        .then(res => res.json())
        .then(data => {
            data.allUsers.forEach(user => usersList.append(usersListUI(user)));
        })
        .catch(error => console.log(error));
};
renderUsers();

const createUser = (user) => {
    console.log(user)

    fetch(URL_CreateUser, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.token
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(data => {
            if(data.status === 400) {
                alert(data.msg);
            }
            console.log(data)
        })
        .catch(error => console.log(error));
};

const onHandleSubmit = event => {
    event.preventDefault();

    user = {
        name: user_name.value,
        email: email.value,
        password: password.value,
        role: role.value
    };

    // TODO Update user
    //if (saveId) {
    //    updateBooking(saveId, name.value, quantity.value, size.value, date.value.slice(0, 10));
    //} else {
    createUser(user);
    //}

    user_name.value = '';
    email.value = '';
    password.value = '';
    role.value = '';

    renderUsers();
};

userForm.addEventListener('submit', onHandleSubmit);
