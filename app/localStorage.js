// localStorage.js

var jwt = require('jsonwebtoken');
import {JWT_TOKEN_KEY} from './utils/constants'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return (jwt.verify(serializedState, JWT_TOKEN_KEY)).state
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    jwt.sign({state}, JWT_TOKEN_KEY, (err, token) => {
      localStorage.setItem('state', token);
    });
  } catch {
    // ignore write errors
  }
};
