import { baseURL } from './config';
import { checkPointsHeaders } from './scoring';
const store = window.localStorage;

export async function getChats() {
    return await fetch(baseURL + '/v1/cube_message', {
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

export async function getMessages(id) {
    return await fetch(baseURL + '/v1/cube_message/' + id, {
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

export async function postMessage(threadID, messageContent) {
    return await fetch(baseURL + '/v1/cube_message/' + threadID, {
        method: 'POST',
        body: JSON.stringify({"content": messageContent}),
        headers: {
            'Authorization': store.getItem("Authorization"),
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        checkPointsHeaders(response);

        return response.json();
    }).then(function (data) {

        return data;
    }).catch(function (err) {
        console.error(err);
        return undefined;
    });
};

export async function getNewMessageParticipants() {
    return await fetch(baseURL + '/v1/cube_message/new', {
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

export async function postNewMessageThread(otherUserID, messageContent) {
    return await fetch(baseURL + '/v1/cube_message/new', {
        method: 'POST',
        body: JSON.stringify({"userID": otherUserID}),
        headers: {
            'Authorization': store.getItem("Authorization"),
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        checkPointsHeaders(response);

        return response.json();
    }).then(async function (data) {

        return await postMessage(data, messageContent);
    }).catch(function (err) {
        console.error(err);
        return undefined;
    });
};

export function searchMessageParticipants(employeesArray, searchText) {
    let search = '' + searchText.toUpperCase();
    let employ = [];

    if (search !== '') {
        (employeesArray.forEach((item) => {
            let name = item.firstName.toUpperCase() + " " + item.lastName.toUpperCase();

            if (name.includes(search)) {
                employ = [item].concat([...employ])
            };
        }))
    } else {
        employ = employ.concat([...employeesArray]);
    }

    return employ;
}