import { TEXT_INPUT } from '../actions/text';

const defaultState = {
	input: ''
}

export default (state = defaultState, action) => {
	switch (action.type) {
		case TEXT_INPUT:
			return { ...state, input: action.payload };
		default:
			return state;
	}
};
