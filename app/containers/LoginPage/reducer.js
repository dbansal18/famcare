/*
 *
 * LoginPage reducer
 *
 */

import produce, { nothing } from 'immer';
import { GET_AUTH_CODE, CLEAR_AUTH_CODE } from './constants';

export const initialState = {
  authCode: '',
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_AUTH_CODE:
        draft.authCode = action.authCode;
        break;
      case CLEAR_AUTH_CODE:
        draft.authCode = '';
        break;
    }
  });

export default loginPageReducer;
