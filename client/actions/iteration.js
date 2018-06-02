export const ITERATION_CHANGE = 'ITERATION_CHANGE';

export function iterationChange(value) {
  return {
    type: ITERATION_CHANGE,
    payload: value
  }
}
