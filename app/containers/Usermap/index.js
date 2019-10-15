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

  useEffect(() => {
    // getUserLocation();
    fetchLocation();
    myMap();
  }, [location])

  const fetchLocation = () => {
    navigator.geolocation.watchPosition(
      pos => {
        const location = {lat: pos.coords.latitude, lng: pos.coords.longitude};
        putLocation(location);
      }
    )
  }

  // const [mapCanvas, setMapCanvas] = useState(document.getElementById("mapsCanvas"));
  // const mapsCanvas = useRef(null)
  // const [mapOptions, setMapOptions] = useState({
  //   center: {lat: 19.0587757, lng: 76.085601},
  //   zoom: 12
  // });
  // const [map, setMap] = useState()
  // const [marker, setMarker] = useState(new google.maps.Marker({position: location, map: map}));

  // const [zoom, setZoom] = useState(11);
  var map;

  function myMap() {
    var mapCanvas = document.getElementById("mapsCanvas");
    var mapOptions = {
      center: {lat: 19.0587757, lng: 76.085601},
      zoom: 12
    };
    map = new google.maps.Map(mapCanvas, mapOptions);
    var marker = new google.maps.Marker({position: location, map: map});
  }

  useEffect(() => {
    map.setCenter(location);
  }, [location]);

  // const imgStyle = {
  //   height: '30px'
  // }

  // const AnyReactComponent = ({ text }) => 
  //   <div>
  //   <img style={imgStyle} alt={text} src="https://res.cloudinary.com/og-tech/image/upload/s--OpSJXuvZ--/v1545236805/map-marker_hfipes.png" />
  //     {text}
  //   </div>;

  return (
    <div>
      <div id="mapsCanvas" style={{ height: 'calc(100vh - 80px)', width: '100%' }}></div>
    </div>
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
