import {
    USER_DATA_SUCCESS,
    USER_DATA_CLEAR,
    API_RESPONSE,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
  } from './constants';
  
  export function userDataLoaded(userData) {
    return {
      type: USER_DATA_SUCCESS,
      userData,
    };
  }
  
  export function userDataClear(userData) {
    return {
      type: USER_DATA_CLEAR,
      userData,
    };
  }
  export function setApiResponseNull() {
    return {
      type: API_RESPONSE,
    };
  }
  export function apiResponseSuccess() {
    return {
      type: API_RESPONSE_SUCCESS,
    };
  }
  export function apiResponseError() {
    return {
      type: API_RESPONSE_ERROR,
    };
  }
