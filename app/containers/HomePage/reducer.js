/* eslint-disable default-case */
/* eslint-disable no-param-reassign */
import produce from 'immer';

import {
  SAVE_POST,
  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE,
  CHANGE_EDIT,
  CHANGE_POST_VALUES,
} from './constants';

// The initial state of the App
export const initialState = {
  edit: false,
  postValues: [],
  error: false,
};

const HomeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SAVE_POST:
        break;
      case SAVE_POST_SUCCESS:
        draft.error = false;
        break;
      case SAVE_POST_FAILURE:
        draft.error = action.error;
        break;
      case CHANGE_EDIT:
        draft.edit = action.edit;
        break;
      case CHANGE_POST_VALUES:
        draft.postValues = action.postValues;
    }
  });

export default HomeReducer;
