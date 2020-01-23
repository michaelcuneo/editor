import CHANGE_VALUE from './constants';

export function changeEdit(value) {
  return {
    type: CHANGE_VALUE,
    value,
  };
}
