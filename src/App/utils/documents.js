import { baseURL } from './config';
import { checkPointsHeaders } from './scoring';
const store = window.localStorage;

export async function getMyDocs(bucketID) {
    let errResponse = {};

    return await fetch(baseURL + '/v1/docs/get?bucketID=cube-hr-files', {
        method: 'GET',
        headers: {
            'Authorization': store.getItem("Authorization")
        }
    }).then(function (response) {
        checkPointsHeaders(response);
        errResponse = {status: response.status, statusText: response.statusText };

        return response.json();
    }).then(function (data) {

        return data;
    }).catch(function (err) {
        console.error(err);
        return errResponse;
    });
};

export async function getMyDocsByUsername(bucketID) {
    let errResponse = {};
    let username = JSON.parse(store.getItem("User")).userName;

    return await fetch(baseURL + '/v1/docs/get?bucketID=' + bucketID + "&username=" + username, {
        method: 'GET',
        headers: {
            'Authorization': store.getItem("Authorization")
        }
    }).then(function (response) {
        checkPointsHeaders(response);
        errResponse = {status: response.status, statusText: response.statusText };

        return response.json();
    }).then(function (data) {

        return data;
    }).catch(function (err) {
        console.error(err);
        return errResponse;
    });
};

export async function uploadHrDocs(acceptedFiles) {
    return await fetch(baseURL + '/v1/docs', {
        method: 'POST',
        body: JSON.stringify(
            {
                "content": 
                {
                    "bucketID": "cube-hr-files"
                }
            }),
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
    });
};