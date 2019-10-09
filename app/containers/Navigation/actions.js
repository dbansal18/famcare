/*
 *
 * Navigation actions
 *
 */

import { DEFAULT_ACTION, LOGOUT_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function logoutAction() {
  return {
    type: LOGOUT_ACTION,
  };
}
