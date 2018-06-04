import {
	LOAD_SESSIONS,
	SESSION_LOAD,
	NAME_CHANGE,
	RESET,
    SESSION_SAVED,
} from '../actions/game';

const defaultState = {
	sessions: [],
	active: null,
	name: ''
}

export default (state = defaultState, action) => {
	switch (action.type) {
		case LOAD_SESSIONS:
			return { ...state, sessions: action.payload }
		case SESSION_LOAD:
			return { ...state, active: action.payload.id }
		case SESSION_SAVED:
			return {
				...state,
				active: action.payload
			}
		case NAME_CHANGE:
			return { ...state, name: action.payload }
		case RESET:
			{
				return { ...state, active: null }
			}
		default:
			return state;
	}
};
