import { CHANGE_SERIALIZED_VALUE } from './constants';

export function changeSerializedValue(serializedValue) {
  return {
    type: CHANGE_SERIALIZED_VALUE,
    serializedValue,
  };
}
