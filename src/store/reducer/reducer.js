import * as actionTypes from '../actions/actionTypes';

const initialState = {
    users: [],
    user: null,
    chatUser: null,
    messages: [],
    error: null,
    loading: false,
    messageSendError: null,
    messageSendLoading: false,
};

const loginStart = (state) => {
    return updateObject( state, { error: null, loading: true } );
};

const loginSuccess = (state, action) => {
    return updateObject( state, {
        user: action.user.user,
        error: null,
        loading: false
    } );
};

const loginFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const logout = (state, action) => {
    return updateObject( state, initialState);
};

const fetchUserSuccess = (state, action) => {
    return updateObject( state, {
        users: action.users,
        error: null,
        loading: false
    } );
};

const initiateChat = (state, action) => {
    return updateObject( state, {
        message: [],
        chatUser: action.user,
    } );
};


const messageStart = (state) => {
    return updateObject( state, { messageSendError: null, messageSendLoading: true } );
};


const messageSuccess = (state, action) => {
    return updateObject( state, {
        messages: state.messages.concat(action.message),
        messageSendError: null,
        messageSendLoading: false
    } );
};

const messageFail = (state, action) => {
    return updateObject( state, {
        messageSendError: action.error,
        messageSendLoading: false
    });
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.USER_LOGIN_START: return loginStart(state, action);
        case actionTypes.USER_LOGIN_SUCCESS: return loginSuccess(state, action);
        case actionTypes.USER_LOGIN_FAIL: return loginFail(state, action);
        case actionTypes.USER_LOGOUT: return logout(state, action);
        case actionTypes.USERS_FETCH_SUCCESS: return fetchUserSuccess(state, action);
        case actionTypes.INITIATE_CHAT: return initiateChat(state, action);
        case actionTypes.MESSAGE_SEND_START: return messageStart(state, action);
        case actionTypes.MESSAGE_SEND_SUCCESS: return messageSuccess(state, action);
        case actionTypes.MESSAGE_SEND_FAIL: return messageFail(state, action);
        default:
            return state;
    }
};

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export default reducer