import axios from 'axios';

import { store } from '../app';

export const VOICE_CHANGE = "VOICE_CHANGE"
export const ITERATION_CHANGE = 'ITERATION_CHANGE';
export const TEXT_CHANGE = 'TEXT_CHANGE';

export const NO_TEXT_ERROR = "NO_TEXT_ERROR";
export const CLOSE_ERROR = "CLOSE_ERROR";

export const GAME_START = "GAME_START";
export const GAME_END = "GAME_END";

export const PLAY_SOUND = "PLAY_SOUND";
export const STOP_SOUND = "STOP_SOUND";

export const RESET = "RESET";

export const LOADING_AUDIO = "LOADING_AUDIO"
export const LOADING_OUTPUT = "LOADING_OUTPUT";

export const GOT_AUDIO = "GOT_AUDIO"
export const GOT_OUTPUT = "GOT_OUTPUT";

export const ADD_TURN = "ADD_TURN"

export const Action = (type, payload = null) => ({ type, payload });

const models = [
	"ar-AR",
	"en-GB",
	"en-US",
	"es-ES",
	"fr-FR",
	"ja-JP",
	"ko-KR",
	"pt-BR",
	"zh-CN",
]

const getSpeechToText = (indexTurn) => {
	const dispatch = store.dispatch;
	const state = store.getState();
	dispatch(new Action(LOADING_OUTPUT, { index: indexTurn }))
	const { voice, audioFileName } = state.turn[indexTurn];
	const model = voice.slice(0, 5);
	return axios.get('/api/speechToText' +
			`?filename=${encodeURIComponent(audioFileName.slice(0, -4))}` +
			`&model=${(models.indexOf(model) !== -1 ? model : "en-US")}`
		)
		.then(res => {
			const output = res.data.results[0].alternatives[0].transcript
			dispatch(new Action(GOT_OUTPUT, {
				index: indexTurn,
				output,
			}))
			nextTurn(voice, output)
		})
		.catch(err => {
			console.error(err);
		})
}

const getTextToSpeech = (indexTurn) => {
	const dispatch = store.dispatch;
	const state = store.getState();
	const { voice, input } = state.turn[indexTurn]
	dispatch(new Action(LOADING_AUDIO, { index: indexTurn }))
	return axios.get(`/api/textToSpeech?text=${input}&voice=${voice}`)
		.then(res => {
			if (!res.data ||
				!res.data.fileUrl ||
				!res.data.filename) throw 'Fail to get file'
			const { fileUrl, filename } = res.data;
			dispatch(new Action(GOT_AUDIO, { index: indexTurn, fileUrl, filename }))
			dispatch(new Action(PLAY_SOUND, fileUrl))
			return getSpeechToText(indexTurn, filename)
		})
		.catch(err => { console.error(err) })
}

function nextTurn(voice, input) {
	const dispatch = store.dispatch;
	const state = store.getState()
	if (state.game.currentTurn !== state.game.numberOfTurns) {
		dispatch(new Action(ADD_TURN, {
			voice,
			input
		}));
		getTextToSpeech(state.game.currentTurn);
	}
	else 
		dispatch(new Action(GAME_END))
}

export function gameStart() {
	const dispatch = store.dispatch;
	const state = store.getState();
	const { voice, input } = state.game
	if (input.length === 0)
		dispatch(new Action(NO_TEXT_ERROR, "Le champs texte est vide"))
	else {
		dispatch(new Action(GAME_START));
		nextTurn(voice, input);
	}
}
