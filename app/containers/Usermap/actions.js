/*
 *
 * Usermap actions
 *
 */

import { DEFAULT_ACTION, FETCH_LOCATION, FETCH_LOCATION_SUCCESS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchLocation() {
  return {
    type: FETCH_LOCATION,
  };
}

export function fetchLocationSuccess(location) {
  return {
    type: FETCH_LOCATION_SUCCESS,
    location,
  };
}
