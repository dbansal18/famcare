/*
 *
 * LoginPage actions
 *
 */

import { GET_USER_DATA, GET_AUTH_CODE, CLEAR_AUTH_CODE } from './constants';

export function getAuthCode(authCode) {
  return {
    type: GET_AUTH_CODE,
    authCode,
  };
}

export function getUserData(authCode) {
  return {
    type: GET_USER_DATA,
    authCode,
  };
}

export function userAuthCodeClear() {
  return {
    type: CLEAR_AUTH_CODE,
  }
}