import axios from "axios";
import * as actionTypes from "./actionTypes";
import Auth from "../../middleware/Auth";
import history from '../../middleware/history';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart);
    const authData = {
      email,
      password
    }

    let url = "/api/user"
    if (!isSignup) {
      url = "/api/login"
    }
    axios.post(url, authData)
      .then(response => {
        if (!isSignup) {
          Auth.authenticateUser(response.data);
          history.push("/");
        }
        dispatch(authSuccess(response.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(authFail(err.error));
      });
  }
}