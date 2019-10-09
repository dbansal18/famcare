/*
 *
 * Dashboard actions
 *
 */

import { DEFAULT_ACTION,
  GET_GROUP_LIST,
  GET_GROUP_LIST_SUCCESS,
  GET_GROUP_LIST_ERROR,
  POST_GROUP,
  POST_GROUP_SUCCESS,
  POST_GROUP_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
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

export function postGroupSuccess() {
  return {
    type: POST_GROUP_SUCCESS,
    group,
  };
}

export function postGroupError() {
  return {
    type: POST_GROUP_ERROR,
    group,
  };
}