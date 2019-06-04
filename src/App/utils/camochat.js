import { baseURL } from './config';
import { checkPointsHeaders } from './scoring';
const store = window.localStorage;

export async function getAllThreads() {
    return await fetch(baseURL + '/v1/camochat', {
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

export async function postNewThread(postString) {
    return await fetch(baseURL + '/v1/camochat', {
        method: 'POST',
        body: JSON.stringify({ topicName: postString }),
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

export async function getThreadReplies(topicID) {
    return await fetch(baseURL + '/v1/camochat/' + topicID + '/replies', {
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

export async function postNewReply(topicID, replyText) {
    return await fetch(baseURL + '/v1/camochat/' + topicID + '/replies', {
        method: 'POST',
        body: JSON.stringify({content: replyText }),
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

export async function getThread(topicID) {
    return await fetch(baseURL + '/v1/camochat/' + topicID, {
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

export async function getReplyInThread(topicID, replyID) {
    return await fetch(baseURL + '/v1/camochat/' + topicID + '/replies/' + replyID, {
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

export async function getAllThreadsByUser(userID) {
    return await fetch(baseURL + '/v1/camochat/users/' + userID + '/topics', {
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