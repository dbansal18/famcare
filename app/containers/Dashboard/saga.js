import { call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { makeSelectUser } from './../App/selectors';
import { API } from 'utils/constants';
import { apiResponseSuccess, apiResponseError } from './../App/actions';
import { 
  GET_GROUP_LIST, 
  GET_GROUP_LIST_SUCCESS, 
  GET_GROUP_LIST_ERROR, 
  POST_GROUP, 
  POST_GROUP_SUCCESS, 
  POST_GROUP_ERROR 
} from './constants';
import { getGroupError, getGroupSuccess, postGroupError } from './actions';

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

// Individual exports for testing
export default function* dashboardSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_GROUP_LIST, getGroupList);
  yield takeLatest(POST_GROUP, postGroup);
}
