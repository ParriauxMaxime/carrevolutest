import { GET_SOUND } from '../actions/sound';

const defaultState = []

export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_SOUND:
            return [...state, action.payload];
		default:
			return state;
	}
};
