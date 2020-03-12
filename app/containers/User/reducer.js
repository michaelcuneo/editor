import produce from 'immer';
import { SET_USER, SET_LOGGED_IN, SET_LOGGED_OUT } from './constants';

export const initialState = {
  user: null,
  loggedIn: false,
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_USER:
        draft.user = action.user;
        break;
      case SET_LOGGED_IN:
        draft.loggedIn = action.loggedIn;
        break;
      case SET_LOGGED_OUT:
        draft.loggedOut = true;
        break;
    }
  });

export default userReducer;
