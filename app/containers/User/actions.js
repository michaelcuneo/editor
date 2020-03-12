import { SET_USER, SET_LOGGED_IN } from './constants';

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function setLoggedIn(loggedIn) {
  return {
    type: SET_LOGGED_IN,
    loggedIn,
  };
}
