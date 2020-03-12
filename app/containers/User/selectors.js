import { createSelector } from 'reselect';

const selectUser = state => state.user;

const makeSelectUser = () =>
  createSelector(
    selectUser,
    userState => userState.user,
  );

const makeSelectUserName = () =>
  createSelector(
    selectUser,
    userState => userState.username,
  );

const makeSelectLoggedIn = () =>
  createSelector(
    selectUser,
    userState => userState.loggedIn,
  );

const makeSelectPicture = () =>
  createSelector(
    selectUser,
    userState => userState.picture,
  );

export {
  selectUser,
  makeSelectUser,
  makeSelectUserName,
  makeSelectLoggedIn,
  makeSelectPicture,
};
