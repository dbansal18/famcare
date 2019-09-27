import { push } from 'connected-react-router';
import { call, all, take, put } from 'redux-saga/effects';
import { userDataLoaded } from 'containers/App/actions';
import { GET_USER_DATA } from './constants';
import request from '../../utils/request';
import { API } from '../../utils/constants';

function* getLoginData(authCode) {
  const requestURL = `${API}/login`;
  const headers = {
    method: 'POST',

    headers: {
      Authorization: authCode,
    },
  };

  try {
    // const userDetails = yield call(request, requestURL, headers);
    const userDetailss = {
      email: "sanket.sonawane@afourtech.com",
      name: "Sanket Sonawane",
      userID: "112474066475912497382",
      hostedDomain: "afourtech.com",
      imageURL: null,
      cardId: "05009125BD0",
      employeeID: "AFT00578",
      contactNumber: "7219115143",
      authKey: "4/bwE0pO-IdHOZec3AcRldXBd785iAj8lGN_Gs8ZJZ7ZCBYrkfk4ccOrAKXM_0wzV3Y_VGDt6g9CL1elC2w-vbdZI",
      userGroups: [
       "afour-pune-campus@afourtech.com",
       "designanddevelopment@afourtech.com",
       "reactgurus@afourtech.com"
      ]
     }
    yield put(userDataLoaded(userDetailss));
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
