/*
 *
 * Usermap reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, FETCH_LOCATION, FETCH_LOCATION_SUCCESS } from './constants';

export const initialState = {
  location: {}
};

/* eslint-disable default-case, no-param-reassign */
const usermapReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case FETCH_LOCATION_SUCCESS:
        draft.location = action.location;
        break;
    }
  });

export default usermapReducer;
