import produce from 'immer';
import { CHANGE_SERIALIZED_VALUE } from './constants';

// The initial state of the App
export const initialState = {
  serializedValue: '',
};

/* eslint-disable default-case, no-param-reassign */
const EditorReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_SERIALIZED_VALUE:
        draft.serializedValue = action.serializedValue;
        break;
    }
  });

export default EditorReducer;
