import { AUTH_LOGIN, AUTH_LOGOUT } from './constants';

export function authLogin() {
  return {
    type: AUTH_LOGIN,
  };
}

export function authLogout() {
  return {
    type: AUTH_LOGOUT,
  };
}
