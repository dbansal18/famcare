/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';

import PrivateRoute from '../../PrivateRoute';
import reducer from './reducer';

import HomePage from 'containers/HomePage/Loadable';
import Navigation from 'containers/Navigation/Loadable';
import Dashboard from 'containers/Dashboard/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Notification from '../../components/Notification/index';
import Usermap from 'containers/Usermap/Loadable';

import GlobalStyle from '../../global-styles';
import { makeSelectAuth, makeApiResponse } from './selectors';

function App({ isAuthenticated, apiResponse }) {
  
  useInjectReducer({ key: 'app', reducer });

  const LoginContainer = () => (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={LoginPage} />
      </Switch>
    </React.Fragment>
  );

  const RedirectContainer = () => (
    <React.Fragment>
      <Redirect to="/dashboard" />
    </React.Fragment>
  );

  const DefaultContainer = () => (
    <React.Fragment>
      <Navigation />
      {apiResponse && apiResponse.status !== 'inProgress' ? (
        <Notification
          infoMessage={apiResponse.message}
          variantType={apiResponse.status}
        />
      ) : (
        ''
      )}
      <Switch>
        <PrivateRoute
          exact
          path="/dashboard"
          component={Dashboard}
          authed={isAuthenticated}
        />
        <PrivateRoute
          exact
          path="/mapp"
          component={Usermap}
          authed={isAuthenticated}
        />
        <PrivateRoute component={NotFoundPage} authed={isAuthenticated} />
      </Switch>
    </React.Fragment>
  );

  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          component={isAuthenticated ? RedirectContainer : LoginContainer}
        />
        <Route component={DefaultContainer} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
  apiResponse: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectAuth(),
  apiResponse: makeApiResponse(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(App);
