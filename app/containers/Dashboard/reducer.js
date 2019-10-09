/*
 *
 * Dashboard reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, GET_GROUP_LIST, GET_GROUP_LIST_SUCCESS, GET_GROUP_LIST_ERROR, POST_GROUP, POST_GROUP_ERROR } from './constants';

export const initialState = {
  loading: false,
  groupList: [],
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_GROUP_LIST:
        draft.loading = true;
        break;
      case GET_GROUP_LIST_SUCCESS:
        draft.loading = false;
        draft.groupList = action.groupList;
        break;
      case GET_GROUP_LIST_ERROR:
        draft.loading = false;
        break;
      case POST_GROUP:
        draft.loading = true;
        break;
      case POST_GROUP_ERROR:
        draft.loading = false;
        break;
    }
  });

export default dashboardReducer;
