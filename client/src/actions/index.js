import axios from 'axios';
import {
  FETCH_USER
} from './types';

// Action creator
// Returns a function that makes a request and gets a response
// After the response it will dispatch the action
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  // Action and dispatch
  dispatch({
    type: FETCH_USER,
    payload: res.data
  })
}

export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token)

  dispatch({
    type: FETCH_USER,
    payload: res.data
  })
}