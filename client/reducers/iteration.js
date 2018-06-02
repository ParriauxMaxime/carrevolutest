import { ITERATION_CHANGE } from '../actions/iteration';

const defaultState = 1

export default (state = defaultState, action) => {
  switch (action.type) {
    case ITERATION_CHANGE:
      return action.payload;
    default:
      return state;
  }
};
