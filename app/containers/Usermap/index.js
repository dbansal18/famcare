/**
 *
 * Usermap
 *
 */

import React, { memo, useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import GoogleMap from 'components/GoogleMap/Loadable';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectLocation} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchLocation, fetchLocationSuccess } from './actions';

export function Usermap({getUserLocation, location, putLocation}) {
  useInjectReducer({ key: 'usermap', reducer });
  useInjectSaga({ key: 'usermap', saga });

  const [center, setCenter] = useState({
    lat: 59.95,
    lng: 30.33
  });
  var id = 0;
  
 
  useEffect(() => {
    // getUserLocation();
    fetchLocation();
  }, [location])

  const fetchLocation = () => {
    navigator.geolocation.watchPosition(
      pos => {
        const location = {lat: pos.coords.latitude, lng: pos.coords.longitude};
        putLocation(location);
      }
    );
  }

  const [zoom, setZoom] = useState(11);

  const imgStyle = {
    height: '30px'
  }

  const AnyReactComponent = ({ text }) => 
    <div>
    <img style={imgStyle} alt={text} src="https://res.cloudinary.com/og-tech/image/upload/s--OpSJXuvZ--/v1545236805/map-marker_hfipes.png" />
      {text}
    </div>;

  return (
    <GoogleMap userLocation={location}/>
  );
}

Usermap.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getUserLocation: PropTypes.func,
  location: PropTypes.object,
  putLocation: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getUserLocation: () => dispatch(fetchLocation()),
    putLocation: (location) => dispatch(fetchLocationSuccess(location)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(Usermap);
