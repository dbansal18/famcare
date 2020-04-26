/**
 *
 * LoginPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { LinearProgress } from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLoginPage from './selectors';
import { getAuthCode, getUserData } from './actions';
import reducer from './reducer';
import saga from './saga';
import './styles.scss';
import Logo from './images/logo.png';

export function LoginPage({ authCode, responseGoogle, onReceivingAuthCode }) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  useEffect(() => {
    if (authCode !== '') onReceivingAuthCode(authCode);
  }, [authCode]);

  const responseGoogles = (res) => console.log('res', res);

  return (
    <div className="login-wrapper">
      {authCode !== '' ? <LinearProgress /> : ''}
      <div className="banner-bg" />
      <div className="login-center">
        <div className="login-box">
          <div className="logo-center">
            <img className="logo-img" src={Logo} alt="Famcare-Logo" />
          </div>
          <h1 className="title">Famcare</h1>
          <p className="tagline">
            Sign in with your google account
          </p>
          <div className="btn-center">
            <GoogleLogin
              clientId="601951843890-jbcqv1r0pdm4pkqkp38qnpf48aphsqra.apps.googleusercontent.com"
              buttonText="Sign in with Google"
              scope="profile"
              onSuccess={responseGoogle}
              cookiePolicy="single_host_origin"
              className="google-btn"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  authCode: PropTypes.string,
  responseGoogle: PropTypes.func,
  onReceivingAuthCode: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  authCode: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    responseGoogle: response => {
      dispatch(getAuthCode(response.tokenObj.id_token));
    },
    onReceivingAuthCode: authCode => {
      dispatch(getUserData(authCode));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginPage);
