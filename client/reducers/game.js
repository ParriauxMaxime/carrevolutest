import { GAME_START, PLAY_SOUND, STOP_SOUND } from '../actions/game';

const defaultState = {
	running: false,
	playing: false,
	urlToPlay: null
}

export default (state = defaultState, action) => {
	switch (action.type) {
		case GAME_START: {
			return { ...state, running: true };
		}
		case PLAY_SOUND : {
			return {...state, playing: true, urlToPlay: action.payload}
		}
		case STOP_SOUND : {
			return {...state, playing: false }
		}
		default:
			return state;
	}
};
