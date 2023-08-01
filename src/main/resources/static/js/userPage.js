const urlUser = 'http://localhost:8080/api/user';

const authUser = fetch(urlUser).then(response => response.json());
authUser.then(user => {
        let roles = '';
        user.roles.forEach(roleEl => {
            roles += roleEl.role.replaceAll("ROLE_", " ");
        })
        document.getElementById("user-email").innerHTML = user.username;
        document.getElementById("user-roles").innerHTML = roles;
    }
)

async function getUserPage() {
    let page = await fetch(urlUser);

    if(page.ok) {
        let user = await page.json();
        getInformationAboutUser(user);
    } else {
        alert(`Error, ${page.status}`)
    }
}

function  getInformationAboutUser(user) {
    const tableBody = document.getElementById('user-table');
    let userbody = '';
    let roles = [];
    console.log('userSata', JSON.stringify(user))
    for (let roleEl of user.roles) {roles
        roles.push(roleEl.role.replaceAll("ROLE_", " "))
    }
    userbody =
        `<tr>
    <td>${user.id}</td>
    <td>${user.firstName}</td>
    <td>${user.lastName}</td>
    <td>${user.age}</td>
    <td>${user.username}</td>
    <td>${roles}</td>
</tr>`

    tableBody.innerHTML = userbody;
}
getUserPage();