/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectEditorContainerState = state =>
  state.EditorContainer || initialState;

const makeSelectValue = () =>
  createSelector(
    selectEditorContainerState,
    editorContainerState => editorContainerState.value,
  );

export { selectEditorContainerState, makeSelectValue };
