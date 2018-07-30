import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import * as actions from '../../store/actions/actions'
import axios from '../../axios';

export default function* watchSaga(action){
    yield takeEvery(actionTypes.USER_LOGIN, userLogin);
    yield takeEvery(actionTypes.USERS_FETCH, fetchUsers);
    yield takeEvery(actionTypes.USER_LOGOUT, userLogout);
    yield takeLatest(actionTypes.MESSAGE_SEND, sendMessage);
}


function* userLogin(action){
    yield put(actions.loginStart());

    try {
        const {data} = yield axios.get(`users/${action.username}`);
        yield put(actions.loginSuccess({
            user: data.data
        }))
    } catch (e) {
        console.log(e);
        yield put(actions.loginFail(e));
    }

}

function* userLogout(action){
    yield put(actions.loginStart());

    try {
        yield axios.get(`users/${action.user.id}/delete`);
        yield put(actions.logoutSuccess())
    } catch (e) {
        yield put(actions.loginFail(e));
    }

}

function* fetchUsers(){
    yield put(actions.loginStart());

    try {
        const {data} = yield axios.get('users');
        yield put(actions.fetchUserSuccess({
            users: data.data
        }))
    } catch (e) {
        console.log(e);
        yield put(actions.loginFail(e));
    }
}

function* sendMessage(action){

    yield put(actions.sendMessageStart());

    try {
        yield axios.post('posts', {
            from: action.user,
            to: action.chatUser,
            message: action.message
        });

        const message = {
          type: 0,
          message: action.message,
          username: action.user.username
        };

        yield put(actions.sendMessageSuccess(message))

    } catch (e) {
        console.log(e);
        yield put(actions.sendMessageFail(e));
    }
}