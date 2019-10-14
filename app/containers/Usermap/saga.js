import { takeLatest, call, put, select } from 'redux-saga/effects';
import { channel } from 'redux-saga';
import {
  FETCH_LOCATION,
  FETCH_LOCATION_SUCCESS,
} from './constants';
import { fetchLocationSuccess} from './actions';

const locationChannel = channel()

// function *fetchLocation(action) {
//   var id = 0;
  
//   var options = {
//     enableHighAccuracy: true,
//   };

//   function success(pos) {
//     var crd = pos.coords;
//     const location = {lat: pos.coords.latitude, lng: pos.coords.longitude};
//     console.log('saga', location)
//     putLocation(location);
//     // yield put(fetchLocationSuccess(location));
//     // put(putLocation(location))
//   }

//   function error(err) {
//     console.warn('ERROR(' + err.code + '): ' + err.message);
//     alert(err.message);
//   }

//   id = navigator.geolocation.watchPosition(success, error, options);
//   console.log('id', id);
// }
function * watchLocationChannel() {
  while (true) {
    const action = yield take(locationChannel)
    yield put(action)
  }
}

function * fetchLocation(options) {
  navigator.geolocation.watchPosition(
    pos => {
      const location = {lat: pos.coords.latitude, lng: pos.coords.longitude};
      locationChannel.put(fetchLocationSuccess(location))
    }
  );
}

// Individual exports for testing
export default function* usermapSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(FETCH_LOCATION, fetchLocation);
}
