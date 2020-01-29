/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectEditorContainerState = state =>
  state.EditorContainer || initialState;

const makeSelectSerializedValue = () =>
  createSelector(
    selectEditorContainerState,
    editorContainerState => editorContainerState.serializedValue,
  );

export { selectEditorContainerState, makeSelectSerializedValue };
