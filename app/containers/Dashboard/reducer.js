/*
 *
 * Dashboard reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, GET_USER_LIST_SUCCESS, GET_GROUP_LIST, GET_GROUP_LIST_SUCCESS, GET_GROUP_LIST_ERROR,
  POST_GROUP, POST_GROUP_ERROR, INVITE_USER, INVITE_USER_ERROR, LEAVE_GROUP, LEAVE_GROUP_ERROR,
  KICK_USER, KICK_USER_SUCCESS, KICK_USER_ERROR
} from './constants';

export const initialState = {
  loading: false,
  userList: [],
  groupList: [],
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_USER_LIST_SUCCESS:
        draft.userList = action.users;
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
      case INVITE_USER:
        draft.loading = true;
        break;
      case INVITE_USER_ERROR:
        draft.loading = false;
        break;
      case LEAVE_GROUP:
        draft.loading = true;
        break;
      case LEAVE_GROUP_ERROR:
        draft.loading = false;
        break;
      case KICK_USER:
        draft.loading = true;
        break;
      case KICK_USER_ERROR:
        draft.loading = false;
        break;
    }
  });

export default dashboardReducer;
