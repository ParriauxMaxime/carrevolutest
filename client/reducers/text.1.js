import { GAME_START } from '../actions/game';

const defaultState = {
	running: false
}

export default (state = defaultState, action) => {
	switch (action.type) {
		case GAME_START:
			return { ...state, running: true };
		default:
			return state;
	}
};
