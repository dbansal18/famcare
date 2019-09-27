import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData,
  );

const makeSelectAuth = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.isAuthenticated,
  );
const makeApiResponse = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.apiResponse,
  );
export { makeSelectLocation, makeSelectUser, makeSelectAuth, makeApiResponse };
