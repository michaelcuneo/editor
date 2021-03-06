import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectValue = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.value,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export { selectGlobal, makeSelectValue, makeSelectLocation };
