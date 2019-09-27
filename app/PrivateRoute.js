import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, authed, ...rest }) => (
  <Route
    {...rest}
    render={props => (authed ? <Component {...props} /> : <Redirect to="/" />)}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.any,
  authed: PropTypes.bool,
};

export default PrivateRoute;