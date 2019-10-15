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

  // const [center, setCenter] = useState({
  //   lat: 59.95,
  //   lng: 30.33
  // });
  // var id = 0;

  // Hook
  let cachedScripts = [];
  function useScript(src) {
    // Keeping track of script loaded and error state
    const [state, setState] = useState({
      loaded: false,
      error: false
    });

    useEffect(
      () => {
        // If cachedScripts array already includes src that means another instance ...
        // ... of this hook already loaded this script, so no need to load again.
        if (cachedScripts.includes(src)) {
          setState({
            loaded: true,
            error: false
          });
        } else {
          cachedScripts.push(src);

          // Create script
          let script = document.createElement('script');
          script.src = src;
          script.async = true;

          // Script event listener callbacks for load and error
          const onScriptLoad = () => {
            setState({
              loaded: true,
              error: false
            });
          };

          const onScriptError = () => {
            // Remove from cachedScripts we can try loading again
            const index = cachedScripts.indexOf(src);
            if (index >= 0) cachedScripts.splice(index, 1);
            script.remove();

            setState({
              loaded: true,
              error: true
            });
          };

          script.addEventListener('load', onScriptLoad);
          script.addEventListener('error', onScriptError);

          // Add script to document body
          document.body.appendChild(script);

          // Remove event listeners on cleanup
          return () => {
            script.removeEventListener('load', onScriptLoad);
            script.removeEventListener('error', onScriptError);
          };
        }
      },
      [src] // Only re-run effect if script src changes
    );

    return [state.loaded, state.error];
  }
  
 
  const [loaded, error] = useScript(
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyDiWFGyuSGusJbWlooWWyEACxTuOsomDJs&callback=initMap'
  );

  useEffect(() => {
    // getUserLocation();
    fetchLocation();
    loaded ? myMap() : ''
  }, [loaded])

  const fetchLocation = () => {
    navigator.geolocation.watchPosition(
      pos => {
        const location = {lat: pos.coords.latitude, lng: pos.coords.longitude};
        putLocation(location);
      }
    );
  }

  // const [zoom, setZoom] = useState(11);

  function myMap() {
    var mapCanvas = document.getElementById("mapsCanvas");
    var mapOptions = {
      center: {lat: 19.0587757, lng: 76.085601},
      zoom: 12
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
    var marker = new google.maps.Marker({position: location, map: map});
    map.setCenter(location);
  }

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
      <div id="mapsCanvas"  style={{ height: 'calc(100vh - 80px)', width: '100%' }}></div>
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
