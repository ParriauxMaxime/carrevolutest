import { VOICE_CHANGE } from '../actions/voice';

const defaultState = "en-US_MichaelVoice"

export default (state = defaultState, action) => {
	switch (action.type) {
		case VOICE_CHANGE: {
			return action.payload;
		}
		default:
			return state;
	}
};
