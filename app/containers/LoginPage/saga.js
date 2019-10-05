import { push } from 'connected-react-router';
import { call, all, take, put } from 'redux-saga/effects';
import { userDataLoaded } from 'containers/App/actions';
import { GET_USER_DATA } from './constants';
import request from '../../utils/request';
import { API } from '../../utils/constants';

function* getLoginData(authCode) {
  console.log('authcoe', authCode);
  // const requestURL = 'http://localhost:8000/user/signin'
  const requestURL = `${API}/user/signin`;
  const headers = {
    method: 'POST',

    headers: {
      Authorization: authCode,
    },
  };

  try {
    const userDetails = yield call(request, requestURL, headers);
    yield put(userDataLoaded(userDetails));
    yield put(push('/dashboard'));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

export default function* loginPageSaga() {
  const { authCode } = yield take(GET_USER_DATA);
  yield all([getLoginData(authCode)]);
}
