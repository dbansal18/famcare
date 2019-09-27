/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const USER_DATA_SUCCESS = 'app/app/USER_DATA_SUCCESS';
export const USER_DATA_CLEAR = 'app/app/USER_DATA_CLEAR';
export const API_RESPONSE = 'app/API_RESPONSE';
export const API_RESPONSE_SUCCESS = 'app/API_RESPONSE_SUCCESS';
export const API_RESPONSE_ERROR = 'app/API_RESPONSE_ERROR';
export const API_RESPONSE_DEFAULT_NOTIFICATION = {
  status: 'inProgress',
  message: 'In Progress',
};
export const API_RESPONSE_SUCCESS_NOTIFICATION = {
  status: 'success',
  message: 'Successful',
};
export const API_RESPONSE_ERROR_NOTIFICATION = {
  status: 'error',
  message: 'Error',
};
