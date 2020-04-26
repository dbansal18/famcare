/*
 *
 * Dashboard actions
 *
 */

import { DEFAULT_ACTION,
  GET_USER_LIST, GET_USER_LIST_SUCCESS,
  GET_GROUP_LIST, GET_GROUP_LIST_SUCCESS, GET_GROUP_LIST_ERROR,
  POST_GROUP, POST_GROUP_SUCCESS, POST_GROUP_ERROR,
  INVITE_USER, INVITE_USER_SUCCESS, INVITE_USER_ERROR,
  LEAVE_GROUP, LEAVE_GROUP_SUCCESS, LEAVE_GROUP_ERROR,
  KICK_USER, KICK_USER_SUCCESS, KICK_USER_ERROR
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getUserList() {
  return {
    type: GET_USER_LIST,
  };
}

export function getUserListSuccess(users) {
  return {
    type: GET_USER_LIST_SUCCESS,
    users,
  };
}

export function getGroupList() {
  return {
    type: GET_GROUP_LIST,
  };
}

export function getGroupSuccess(groupList) {
  return {
    type: GET_GROUP_LIST_SUCCESS,
    groupList,
  };
}

export function getGroupError(error) {
  return {
    type: GET_GROUP_LIST_ERROR,
    error,
  };
}

export function postGroup(group) {
  return {
    type: POST_GROUP,
    group,
  };
}

export function postGroupSuccess(group) {
  return {
    type: POST_GROUP_SUCCESS,
    group,
  };
}

export function postGroupError(error) {
  return {
    type: POST_GROUP_ERROR,
    error,
  };
}

export function inviteUser(invite) {
  return {
    type: INVITE_USER,
    invite,
  };
}

export function inviteUserSuccess() {
  return {
    type: INVITE_USER_SUCCESS,
  };
}

export function inviteUserError(error) {
  return {
    type: INVITE_USER_ERROR,
    error,
  };
}

export function leaveGroup(group) {
  return {
    type: LEAVE_GROUP,
    group,
  };
}

export function leaveGroupSuccess() {
  return {
    type: LEAVE_GROUP_SUCCESS,
  };
}

export function leaveGroupError(error) {
  return {
    type: LEAVE_GROUP_ERROR,
    error,
  };
}

export function kickUser(kick) {
  return {
    type: KICK_USER,
    kick,
  };
}

export function kickUserSuccess() {
  return {
    type: KICK_USER_SUCCESS,
  };
}

export function kickUserError(error) {
  return {
    type: KICK_USER_ERROR,
    error,
  };
}