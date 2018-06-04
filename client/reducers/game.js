import {
	GAME_START,
	GAME_END,
	PLAY_SOUND,
	STOP_SOUND,
	NO_TEXT_ERROR,
	CLOSE_ERROR,
	RESET,
    TEXT_CHANGE,
    ITERATION_CHANGE,
    VOICE_CHANGE,
} from '../actions/game';

const defaultState = {
	running: false,
	input: '',
	voice: 'en-US_MichaelVoice',
	numberOfTurns: 1,
	currentTurn: 0,
	error: {
		open: false,
		reason: '',
	}
}

export default (state = defaultState, action) => {
	switch (action.type) {
		case TEXT_CHANGE:
			return { ...state, input: action.payload }
		case VOICE_CHANGE:
			return { ...state, voice: action.payload };
		case ITERATION_CHANGE: 
			return { ...state, numberOfTurns: action.payload}
		case GAME_START:
			return { ...state, running: true };
		case GAME_END:
			return { ...state, running: false };
		case NO_TEXT_ERROR:
			return { ...state, error: { open: true, reason: action.payload } }
		case CLOSE_ERROR:
			return { ...state, error: { ...state.error, open: false } }
		case RESET:
			return {...state, currentTurn: defaultState.currentTurn, running: false}
		default:
			return state;
	}
};
