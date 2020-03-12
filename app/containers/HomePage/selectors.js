import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHomeState = state => state.home || initialState;

const makeSelectEdit = () =>
  createSelector(
    selectHomeState,
    homePageState => homePageState.edit,
  );

const makeSelectPostValues = () =>
  createSelector(
    selectHomeState,
    homePageState => homePageState.postValues,
  );

export { selectHomeState, makeSelectEdit, makeSelectPostValues };
