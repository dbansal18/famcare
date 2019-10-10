import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboard state domain
 */

const selectDashboardDomain = state => state.dashboard || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Dashboard
 */

const makeSelectDashboard = () =>
  createSelector(selectDashboardDomain, substate => substate);

const makeSelectLoading = () =>
  createSelector(
    selectDashboardDomain,
    substate => substate.loading,
  );

const makeSelectUserList = () =>
  createSelector(
    selectDashboardDomain,
    substate => substate.userList,
  );

const makeSelectGroupList = () =>
  createSelector(
    selectDashboardDomain,
    substate => substate.groupList,
  );

export default makeSelectDashboard;

export { 
  selectDashboardDomain,
  makeSelectLoading,
  makeSelectUserList,
  makeSelectGroupList, 
};
