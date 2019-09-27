/**
 *
 * Usermap
 *
 */

import React, { memo, useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import GoogleMap from 'google-map-react';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUsermap from './selectors';
import reducer from './reducer';
import saga from './saga';

export function Usermap() {
  useInjectReducer({ key: 'usermap', reducer });
  useInjectSaga({ key: 'usermap', saga });

  const [center, setCenter] = useState({
    lat: 59.95,
    lng: 30.33
  });
  
  useLayoutEffect(() => {
    if ("geolocation" in navigator) {
      var id = 0;
      var options = {
        enableHighAccuracy: true,
        maximumAge: 0
      };

      function success(pos) {
        var crd = pos.coords;
        const location = {lat: pos.coords.latitude, lng: pos.coords.longitude};
        setCenter(location);
      }

      function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
        alert(err.message);
      }

      id = navigator.geolocation.watchPosition(success, error, options);
    } else {
      alert('Geolocaton not supported');
    }
  }, []);

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
    <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMap
              bootstrapURLKeys={{ key: 'AIzaSyDiWFGyuSGusJbWlooWWyEACxTuOsomDJs' }}
              defaultCenter={center}
              defaultZoom={zoom}
            >
              <AnyReactComponent
                lat={center.lat}
                lng={center.lng}
                text="MY1"
              />
              <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text="1"
              />
              <AnyReactComponent
                lat={59.965413}
                lng={30.337844}
                text="2"
              />
            </GoogleMap>
    </div>
  );
}

Usermap.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  usermap: makeSelectUsermap(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(Usermap);
