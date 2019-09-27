/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  USER_DATA_SUCCESS,
  USER_DATA_CLEAR,
  API_RESPONSE,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
  API_RESPONSE_DEFAULT_NOTIFICATION,
  API_RESPONSE_SUCCESS_NOTIFICATION,
  API_RESPONSE_ERROR_NOTIFICATION,
} from './constants';
import { loadState } from '../../localStorage';

// The initial state of the App
export const initialState = {
  userData: {},
  isAuthenticated: false,
  apiResponse: { ...API_RESPONSE_DEFAULT_NOTIFICATION },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = loadState() || initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case USER_DATA_SUCCESS:
        draft.userData = action.userData;
        draft.isAuthenticated = true;
        draft.apiResponse = { ...API_RESPONSE_DEFAULT_NOTIFICATION };
        break;
      case USER_DATA_CLEAR:
        draft.userData = action.userData;
        draft.isAuthenticated = false;
        draft.apiResponse = { ...API_RESPONSE_DEFAULT_NOTIFICATION };
        break;
      case API_RESPONSE:
        draft.apiResponse = { ...API_RESPONSE_DEFAULT_NOTIFICATION };
        break;
      case API_RESPONSE_SUCCESS:
        draft.apiResponse = { ...API_RESPONSE_SUCCESS_NOTIFICATION };
        break;
      case API_RESPONSE_ERROR:
        draft.apiResponse = { ...API_RESPONSE_ERROR_NOTIFICATION };
        break;
    }
  });

export default appReducer;
