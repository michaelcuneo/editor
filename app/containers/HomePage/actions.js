import {
  SAVE_POST,
  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE,
  CHANGE_EDIT,
  CHANGE_POST_VALUES,
} from './constants';

export function savePost() {
  return {
    type: SAVE_POST,
  };
}

export function savePostSuccess() {
  return {
    type: SAVE_POST_SUCCESS,
  };
}

export function savePostFailure(error) {
  return {
    type: SAVE_POST_FAILURE,
    error,
  };
}

export function changeEdit(edit) {
  return {
    type: CHANGE_EDIT,
    edit,
  };
}

export function changePostValues(postValues) {
  return {
    type: CHANGE_POST_VALUES,
    postValues,
  };
}
