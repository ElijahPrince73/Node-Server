import axios from 'axios';
import {
  FETCH_USER
} from './types';

// Action creator
// Returns a function that makes a request and gets a response
// After the response it will dispatch the action
export const fetchUser = () => {
  return function(dispatch) {
    axios.get('/api/current_user')
      // Action and dispatch
      .then((res) => dispatch({
        type: FETCH_USER,
        payload: res
      }))
      .catch((err) => {
        console.log(err);
      })
  }
}