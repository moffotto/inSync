import { baseURL } from './config';
import { checkPointsHeaders } from './scoring';
const store = window.localStorage;


export async function signIn(username, password, handleSignIn) {
    let authToken = null;

    await fetch(baseURL + '/v1/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: username,
            password: password,
        })
    }).then(function (response) {
        checkPointsHeaders(response);

        authToken = response.headers.get("Authorization")
        return response.json();
    }).then(function (data) {
        store.setItem("Authorization", authToken);
        store.setItem("User", JSON.stringify(data));

        handleSignIn();
    }).catch(function (err) {
        console.error(err);
    });
};

export async function signOut(handleSignOut) {

    await fetch(baseURL + '/v1/sessions/mine', {
        method: 'DELETE',
        headers: {
            'Authorization': store.getItem("Authorization")
        }
    }).then(function (response) {
        checkPointsHeaders(response);

        return response;
    }).then(function (data) {
        store.removeItem("Authorization");
        store.removeItem("User");
       
        handleSignOut();
    }).catch(function (err) {
        console.error(err);
    });
};

export async function allUsers() {

    return await fetch(baseURL + '/v1/search_users', {
        method: 'GET',
        headers: {
            'Authorization': store.getItem("Authorization")
        }
    }).then(function (response) {
        checkPointsHeaders(response);

        return response.json();
    }).then(function (data) {

        return data;
    }).catch(function (err) {
        console.error(err);
    });
};

export function searchUsers(employeesArray, searchText) {
    let search = '' + searchText.toUpperCase();
    let employ = [];

    if (search !== '') {
        (employeesArray.forEach((item) => {
            let name = item.user.firstName.toUpperCase() + " " + item.user.lastName.toUpperCase();

            if (name.includes(search)) {
                employ = [item].concat([...employ])
            };
        }))
    } else {
        employ = employ.concat([...employeesArray]);
    }

    return employ;
}