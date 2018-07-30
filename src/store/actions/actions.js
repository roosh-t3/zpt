import * as actionTypes from "./actionTypes";

export const login = (username) => {
    return {
        type: actionTypes.USER_LOGIN,
        username: username
    };
};

export const loginStart = () => {
    return {
        type: actionTypes.USER_LOGIN_START
    };
};

export const loginSuccess = user => {
    return {
        type: actionTypes.USER_LOGIN_SUCCESS,
        user: user,
    };
};

export const loginFail = error => {
    return {
        type: actionTypes.USER_LOGIN_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.USER_LOGOUT,
    };
};

export const fetchUsers = () => {
    return {
        type: actionTypes.USERS_FETCH
    };
};

export const fetchUserSuccess = users => {
    return {
        type: actionTypes.USERS_FETCH_SUCCESS,
        users: users.users,
    };
};

export const initiateChat = user => {
    return {
        type: actionTypes.INITIATE_CHAT,
        user: user
    }
};

export const sendMessage = (content) => {
    return {
        type: actionTypes.MESSAGE_SEND,
        user: content.user,
        chatUser: content.chatUser,
        message: content.message,
    };
};

export const sendMessageStart = () => {
    return {
        type: actionTypes.MESSAGE_SEND_START
    };
};

export const sendMessageSuccess = message => {
    return {
        type: actionTypes.MESSAGE_SEND_SUCCESS,
        message: message,
    };
};


export const sendMessageFail = error => {
    return {
        type: actionTypes.MESSAGE_SEND_FAIL,
        error: error
    };
};