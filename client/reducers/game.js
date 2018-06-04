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
	GOT_OUTPUT,
	AUTOPLAY_CHANGE,
	LONDONCALLING_CHANGE,
	ERASMUS_CHANGE,
	SESSION_SAVED,
    SESSION_SAVING,
    COMPUTING_TURN_NB,
    TOGGLE_SESSION_DRAWER,
    SESSION_LOAD,
} from '../actions/game';

const defaultState = {
	running: false,
	input: '',
	autoPlay: false,
	londonCalling: false,
	erasmus: false,
	sessionDrawer: false,
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
			return { ...state, numberOfTurns: action.payload }
		case AUTOPLAY_CHANGE:
			return { ...state, autoPlay: !state.autoPlay }
		case LONDONCALLING_CHANGE:
			return { ...state, londonCalling: !state.londonCalling }
		case ERASMUS_CHANGE:
			return { ...state, erasmus: !state.erasmus }
		case TOGGLE_SESSION_DRAWER:
			return { ...state, sessionDrawer: !state.sessionDrawer }
		case GAME_START:
			return { ...state, running: true };
		case GAME_END:
			return { ...state, running: false };
		case GOT_OUTPUT:
			return { ...state, currentTurn: state.currentTurn + 1 }
		case NO_TEXT_ERROR:
			return { ...state, error: { open: true, reason: action.payload } }
		case COMPUTING_TURN_NB:
			return { ...state, error: { open: true, reason: `Traitement du tour n°${action.payload.index + 1}` } }		
		case SESSION_SAVED:
			return { ...state, error: { open: true, reason: "Session sauvegardée" } }
		case SESSION_SAVING:
			return { ...state, error: { open: true, reason: "Session en cours de sauvegarde" } }
		case CLOSE_ERROR:
			return { ...state, error: { ...state.error, open: false } }
		case SESSION_LOAD:
			return { ...state, ...action.payload.game, running: false, error: {open: true, reason: "Session restauré"} }
		case RESET:
			return { ...state, currentTurn: defaultState.currentTurn, running: false }
		default:
			return state;
	}
};
