import { call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { makeSelectUser } from './../App/selectors';
import { API } from 'utils/constants';
import { apiResponseSuccess, apiResponseError } from './../App/actions';
import {
  GET_USER_LIST,
  GET_GROUP_LIST,
  POST_GROUP,
  INVITE_USER, 
  LEAVE_GROUP,
  KICK_USER
} from './constants';
import { getUserListSuccess, getGroupError, getGroupSuccess, postGroupError,
  inviteUserSuccess, inviteUserError, leaveGroupSuccess, leaveGroupError, kickUserSuccess, kickUserError
} from './actions';

function *getUserList() {
  const reqUrl = `${API}/user`;
  const headers = {
    method: 'GET',
  };
  try {
    const userList = yield call(request, reqUrl, headers);
    yield put(getUserListSuccess(userList));
  } catch (error) {
    // yield put(getUserError(error));
  }
}

function *getGroupList() {
  const user = yield select(makeSelectUser());
  const reqUrl = `${API}/group`;
  const headers = {
    method: 'GET',
    headers: {
      Authorization: user.authCode,
    },
  };
  try {
    const groupList = yield call(request, reqUrl, headers);
    yield put(getGroupSuccess(groupList));
  } catch (error) {
    yield put(getGroupError(error));    
  }
}

function *postGroup(action) {
  const user = yield select(makeSelectUser());
  const reqUrl = `${API}/group`;
  const headers = {
    method: 'POST',
    headers: {
      Authorization: user.authCode,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ groupName: action.group.groupName, image: action.group.file }),
  };
  try {
    const groupList = yield call(request, reqUrl, headers);
    yield call(getGroupList);
  } catch (error) {
    console.log('err', error);
    yield put(postGroupError());
  }
}

function *inviteUser(action) {
  const user = yield select(makeSelectUser());
  const reqUrl = `${API}/group/invite`;
  const headers = {
    method: 'POST',
    headers: {
      Authorization: user.authCode,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ group: action.invite.group, email: action.invite.email }),
  };
  try {
    const groupList = yield call(request, reqUrl, headers);
    yield call(getGroupList);
  } catch (error) {
    console.log('err', error);
    yield put(inviteUserError);
  }
}

function *leaveFromGroup(action) {
  const user = yield select(makeSelectUser());
  const reqUrl = `${API}/group/leave`;
  const headers = {
    method: 'POST',
    headers: {
      Authorization: user.authCode,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ group: action.group }),
  };
  try {
    const groupList = yield call(request, reqUrl, headers);
    yield call(getGroupList);
  } catch (error) {
    console.log('err', error);
    yield put(leaveGroupError(error));
  }
}

function *removeUser(action) {
  const user = yield select(makeSelectUser());
  const reqUrl = `${API}/group/remove`;
  const headers = {
    method: 'POST',
    headers: {
      Authorization: user.authCode,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ group: action.kick.group, email: action.kick.email }),
  };
  try {
    const groupList = yield call(request, reqUrl, headers);
    yield call(getGroupList);
  } catch (error) {
    console.log('err', error);
    yield put(kickUserError(error));
  }
}

// Individual exports for testing
export default function* dashboardSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_USER_LIST, getUserList);
  yield takeLatest(GET_GROUP_LIST, getGroupList);
  yield takeLatest(POST_GROUP, postGroup);
  yield takeLatest(INVITE_USER, inviteUser);
  yield takeLatest(LEAVE_GROUP, leaveFromGroup);
  yield takeLatest(KICK_USER, removeUser);
}
