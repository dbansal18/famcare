// import { take, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { call, all, take, put } from 'redux-saga/effects';

import { logoutAction } from './actions';
import { LOGOUT_ACTION } from './constants';
import { userDataClear } from 'containers/App/actions';
import { userAuthCodeClear } from 'containers/LoginPage/actions';

function* logoutUser() {
  const userData = {};
  yield put(userDataClear(userData));
  yield put(userAuthCodeClear())
  yield all([localStorage.clear()])
  window.location.href = '/'
}

// Individual exports for testing
export default function* navigationSaga() {
  // See example in containers/HomePage/saga.js
  yield take(LOGOUT_ACTION);
  yield all([logoutUser()]);
}

