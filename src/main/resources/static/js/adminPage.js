const urlAdmin = 'http://localhost:8080/api/admin';

async function getAdminPage() {
    let page = await fetch(urlAdmin);

    if(page.ok) {
        let usersList = await  page.json();
        getUsersTable(usersList);
    } else {
        alert(`Error, ${page.status}`)
    }
}

function  getUsersTable(usersList) {
    const tableBody = document.getElementById('admin-table');
    let userbody = '';
    for (let user of usersList) {
        let roles = [];
        for (let roleEl of user.roles) {
            roles.push(roleEl.role.replaceAll("ROLE_", " "))
        }
        userbody +=
            `<tr>
    <td>${user.id}</td>
    <td>${user.firstName}</td>
    <td>${user.lastName}</td>
    <td>${user.age}</td>
    <td>${user.username}</td>
    <td>${roles}</td>
    <td>
        <a class="text-white py-1 px-2 btn edit_btn" type="button" data-bs-toggle="modal" 
        data-bs-target="#userUpdateForm" onclick="loadEditForm(${user.id})">Edit</a>
    </td>

    <td>
        <a class="bg-danger text-white py-1 px-2 btn" type="button"
        data-bs-target="#formDelete"
        data-bs-toggle="modal" onclick="loadDeleteForm(${user.id})">Delete</a>
    </td>
</tr>`
    }
    tableBody.innerHTML = userbody;
}
getAdminPage();
getUserPage();

//Edit
const form_edit = document.getElementById('editForm');
const id_edit = document.getElementById('idEdit');
const name_edit = document.getElementById('firstNameEdit');
const lastname_edit = document.getElementById('lastNameEdit');
const age_edit = document.getElementById('ageEdit');
const username_edit = document.getElementById('usernameEdit');
const userUpdateForm = document.getElementById("userUpdateForm");
const closeEditButton = document.getElementById("editClose")
const bootstrapEdit = new bootstrap.Modal(userUpdateForm);

async function loadEditForm(id) {
    const  urlUserEdit = '/api/admin/' + id;
    let usersPageEdit = await fetch(urlUserEdit);
    if (usersPageEdit.ok) {
        await usersPageEdit.json().then(user => {
            console.log('adminData', JSON.stringify(user))
            id_edit.value = `${user.id}`;
            name_edit.value = `${user.firstName}`;
            lastname_edit.value = `${user.lastName}`;
            age_edit.value = `${user.age}`;
            username_edit.value = `${user.username}`;
        })
        console.log("id_edit: " + id_edit.value)
        bootstrapEdit.show();
    } else {
        alert(`Error, ${usersPageEdit.status}`)
    }
}
async function editUser() {
    let urlEdit = '/api/admin/' + id_edit.value;
    let rolesList = [];
    console.dir(form_edit)
    for (let i=0; i<form_edit.roles.options.length; i++) {
        if (form_edit.roles.options[i].selected) {
            let tmp={};
            tmp["id"]=form_edit.roles.options[i].value
            rolesList.push(tmp);
        }
    }
    let method = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName: form_edit.firstName.value,
            lastName: form_edit.lastName.value,
            age: form_edit.age.value,
            username: form_edit.username.value,
            password: form_edit.password.value,
            roles: rolesList
        })
    }
    console.log(urlEdit, method)
    await fetch(urlEdit, method).then(() => {
        closeEditButton.click();
        getAdminPage();
    })
}

//Delete user
const id_delete = document.getElementById('idDelete');
const name_delete = document.getElementById('firstNameDelete');
const lastname_delete = document.getElementById('lastNameDelete');
const age_delete = document.getElementById('ageDelete');
const username_delete = document.getElementById('usernameDelete');
const role_delete = document.getElementById("roleDelete")
const deleteForm = document.getElementById("formDelete");
const closeDeleteButton = document.getElementById("closeDelete")
const bsDelete = new bootstrap.Modal(deleteForm);

async function loadDeleteForm(id) {
    const  urlDeleteById = 'api/admin/' + id;
    let userDeletePage = await fetch(urlDeleteById);
    if (userDeletePage.ok) {
        // let userData =
            await userDeletePage.json().then(user => {
                id_delete.value = `${user.id}`;
                name_delete.value = `${user.firstName}`;
                lastname_delete.value = `${user.lastName}`;
                age_delete.value = `${user.age}`;
                username_delete.value = `${user.username}`;
                role_delete.value = user.roles.map(r=>r.role).join(", ");
            })

        bsDelete.show();
    } else {
        alert(`Error, ${userDeletePage.status}`)
    }
}
async function deleteUser() {
    let urlDelete = 'api/admin/' + id_delete.value;
    let method = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(urlDelete, method).then(() => {
        closeDeleteButton.click();
        getAdminPage();
    })
}

//Add new User
const form_addUser = document.getElementById('addUserForm');
const role_addUser = document.querySelector('#roles').selectedOptions;

form_addUser.addEventListener('submit', addUser);

async function addUser(event) {
    event.preventDefault();
    // const url = '/api/admin';
    let rolesList = [];
    for (let i = 0; i < role_addUser.length; i++) {
        rolesList.push({
            id:role_addUser[i].value
        });
    }
    let user = {
        firstName: form_addUser.firstName.value,
        lastName: form_addUser.lastName.value,
        age: form_addUser.age.value,
        password: form_addUser.password.value,
        username: form_addUser.username.value,
        roles: rolesList
    }
    console.log(urlAdmin, user);
    await fetch(urlAdmin, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(res => {
        console.log(res);
        form_addUser.reset();
        getAdminPage();
    });

}
