/**
 *
 * Dashboard
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';

import './styles.scss';
import Logo from './images/logo.png';

export function Dashboard() {
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });

  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  useEffect(() => {
    console.log('1');
    
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude);
      setLon(pos.coords.longitude)
      console.log('hhh', lat, lon)
    })
    // return function cleanup() {
    //   setLat(null);
    //   setLon(null);
    // };
  })
  
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <div className="content-area area-height">
        <div className="page-404">
          <div className="ht-100 content">
            <h1 className="main-heading">
              <div className="logo-center">
                <img className="logo-img" src={Logo} alt="JMITLogo" />
              </div>
            </h1>
            <h2>Dashboard page is under construction.</h2>
            <Link
              to={{
                pathname: '/mapp',
              }}
            >
              Map
            </Link>
            {
              ("geolocation" in navigator) ? 'hii' : 'nonnn'
            }
            <div>{lat}</div>
            <div>{lon}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect
)(Dashboard);
