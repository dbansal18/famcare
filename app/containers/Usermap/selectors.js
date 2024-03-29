import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the usermap state domain
 */

const selectUsermapDomain = state => state.usermap || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Usermap
 */

const makeSelectUsermap = () =>
  createSelector(selectUsermapDomain, substate => substate);

const makeSelectLocation = () =>
  createSelector(selectUsermapDomain, substate => substate.location);

// export default makeSelectUsermap;
export { selectUsermapDomain, makeSelectLocation };
