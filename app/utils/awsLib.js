import { API, Storage, Auth } from 'aws-amplify';

const AUTH_TOKEN = 'auth_token';
const AUTH_GROUP = 'auth_group';
const GLOBAL_SETTINGS = 'global_settings';

/* =========================================================
   Hosted UI Callback setup.
*/

export function loggedIn() {
  return !!getAuthToken();
}

export function loggedOut() {
  return !loggedIn();
}

export function setAuthToken(authToken) {
  localStorage.setItem(AUTH_TOKEN, authToken);
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN);
}

export function setAuthGroup(authGroup) {
  return localStorage.setItem(AUTH_GROUP, authGroup);
}

export function getAuthGroup() {
  return localStorage.getItem(AUTH_GROUP);
}

export function setGlobalSettings(globalSettings) {
  return localStorage.setItem(GLOBAL_SETTINGS, globalSettings);
}

export function getGlobalSettings() {
  return localStorage.getItem(GLOBAL_SETTINGS);
}

export function removeAuth() {
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(AUTH_GROUP);
}

/* =========================================================
   Custom UI setup.
*/

export function signInUser(username, password) {
  return Auth.signIn(username, password);
}

export function signOutUser() {
  return Auth.signOut();
}

export function signUpUser(username, password, email, givenName, familyName) {
  return Auth.signUp({
    username,
    password,
    attributes: {
      email,
      givenName,
      familyName,
    },
  });
}

export function verifyUser(username, code) {
  return Auth.confirmSignUp(username, code);
}

export function federatedSignIn(provider, response, user) {
  return Auth.federatedSignIn(provider, response, user)
    .then(result => result)
    .catch(error => error);
}

/* =========================================================
   Auth Information.
*/

export async function getCurrentSession() {
  return Auth.currentSession()
    .then(response => response)
    .catch(err => err);
}

export async function getCurrentCredentials() {
  return Auth.currentCredentials()
    .then(response => response)
    .catch(err => err);
}

export async function getCurrentUserCredentials() {
  return Auth.currentUserCredentials()
    .then(response => response)
    .catch(err => err);
}

export async function getCurrentAuthenticatedUser() {
  return Auth.currentAuthenticatedUser()
    .then(response => response)
    .catch(err => err);
}

export async function getCurrentUserInfo() {
  return Auth.currentUserInfo()
    .then(response => response)
    .catch(err => err);
}

export async function getCurrentUserPoolUser() {
  return Auth.currentUserPoolUser.then(response => response).catch(err => err);
}

export async function getUserAttributes(user) {
  return Auth.userAttributes(user)
    .then(response => response)
    .catch(err => err);
}

/* =========================================================
   API and S3 Setup.
*/

// REST FUNCTIONS
export async function getApi(apiName, path, options) {
  return API.get(apiName, path, options)
    .then(response => response)
    .catch(error => error);
}

export async function putApi(apiName, path, options) {
  return API.put(apiName, path, options)
    .then(reponse => reponse)
    .catch(error => error);
}

export async function putS3(filename, file, type) {
  return Storage.put(filename, file, {
    contentType: type,
  })
    .then(response => response)
    .catch(error => error);
}

export function getS3(name, access) {
  return Storage.get(name, access)
    .then(response => response)
    .catch(error => error);
}

export function removeS3(name) {
  return Storage.remove(name)
    .then(response => response)
    .catch(error => error);
}
