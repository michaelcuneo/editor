/**
 * Gets the repositories of the user from Github
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { getCurrentSession } from 'utils/awsLib';

import decode from 'jwt-decode';

import userImage from 'images/user.svg';

import { setUser, setLoggedIn } from 'containers/User/actions';
import { AUTH_LOGIN, AUTH_LOGOUT } from './constants';

export function* setLogin() {
  // Call function to get Userdata from AWS Auth.
  const session = yield call(checkCurrentSession);

  // Get the username of the current logged in user
  const token = session.idToken.jwtToken;
  const decoded = decode(token);

  // If the current logged in user does not have a staff profile yet... just use their logged in username, and the default picture.
  const user = {
    username: decoded['cognito:username'],
    group: decoded['cognito:groups']
      ? decoded['cognito:groups'][0]
      : 'Administrator',
    picture: userImage,
  };

  try {
    yield put(setUser(user));
    yield put(setLoggedIn(true));
    yield put(push('/'));
  } catch (err) {
    yield put(setLoggedIn(false, err));
    yield put(push('/'));
  }
}

export function* setLogout() {
  try {
    yield put(setLoggedIn(false));
    yield put(push('/'));
  } catch (err) {
    yield put(setLoggedIn(true, err));
  }
}

async function checkCurrentSession() {
  return getCurrentSession().then(result => result);
}

export default function* changeLoggedIn() {
  yield all([
    takeLatest(AUTH_LOGIN, setLogin),
    takeLatest(AUTH_LOGOUT, setLogout),
  ]);
}
