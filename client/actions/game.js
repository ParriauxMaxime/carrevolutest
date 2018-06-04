import axios from 'axios';

import { store } from '../app';
import { setInterval, clearInterval } from 'timers';
import { voices, getLanguageVoice } from '../components/VoiceSelector';

export const VOICE_CHANGE = "VOICE_CHANGE"
export const ITERATION_CHANGE = 'ITERATION_CHANGE';
export const TEXT_CHANGE = 'TEXT_CHANGE';
export const NAME_CHANGE = 'NAME_CHANGE';
export const AUTOPLAY_CHANGE = 'AUTOPLAY_CHANGE';
export const LONDONCALLING_CHANGE = 'LONDONCALLING_CHANGE';
export const ERASMUS_CHANGE = 'ERASMUS_CHANGE';
export const TOGGLE_SESSION_DRAWER = "TOGGLE_SESSION_DRAWER";

export const NO_TEXT_ERROR = "NO_TEXT_ERROR";
export const LOAD_SESSIONS = "LOAD_SESSIONS";
export const SESSION_LOAD = "SESSION_LOAD";
export const SESSION_SAVED = "SESSION_SAVED";
export const SESSION_SAVING = "SESSION_SAVING";
export const COMPUTING_TURN_NB = "COMPUTING_TURN_NB";
export const CLOSE_ERROR = "CLOSE_ERROR";

export const GAME_START = "GAME_START";
export const GAME_END = "GAME_END";

export const PLAY_SOUND = "PLAY_SOUND";
export const STOP_SOUND = "STOP_SOUND";

export const RESET = "RESET";

export const LOADING_AUDIO = "LOADING_AUDIO"
export const LOADING_OUTPUT = "LOADING_OUTPUT";

export const GOT_AUDIO = "GOT_AUDIO";
export const GOT_OUTPUT = "GOT_OUTPUT";

export const CHANGE_MODEL = "CHANGE_MODEL"
export const CHANGE_VOICE = "CHANGE_VOICE"

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

const addTurn = (voice, input, model) => {
	if (!model) {
		const lang = voice.slice(0, 5);
		model = models.indexOf(lang) !== -1 ? lang : "en-US"
	}
	return new Action(ADD_TURN, {
		voice,
		input,
		model
	})
}

const getSpeechToText = (indexTurn) => {
	const dispatch = store.dispatch;
	const state = store.getState();
	const { voice, audioFileName, model } = state.turn[indexTurn];
	dispatch(new Action(LOADING_OUTPUT, { index: indexTurn }))
	return axios.get('/api/speechToText' +
			`?filename=${encodeURIComponent(audioFileName.slice(0, -4))}` +
			`&model=${(model)}`
		)
		.then(res => {
			const output = res.data.results[0].alternatives[0].transcript
			dispatch(new Action(GOT_OUTPUT, {
				index: indexTurn,
				output,
			}))
			let waitForPlayEnd = Promise.resolve();
			if (state.game.autoPlay) {
				waitForPlayEnd = new Promise((resolve, reject) => {
					// Everybody love this kind of disgusting promise
					const inter = setInterval(() => {
						if (!store.getState()
							.turn[indexTurn].playingAudio) {
							clearInterval(inter);
							resolve()
						}
					}, 100)
				})
			}
			waitForPlayEnd.then(_ => {
				//Recursion++
				nextTurn(voice, output)
			})
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
			if (state.game.autoPlay)
				dispatch(new Action(PLAY_SOUND, { index: indexTurn }))
			return getSpeechToText(indexTurn, filename)
		})
		.catch(err => { console.error(err) })
}

function saveSession(state) {
	return axios.post('/api/saveSession', state);
}
/**
 * Run the nextTurn.
 * Every codebase should own one of those delicious and obscure
 * function of 100 lines with a totally meaningless name.
 * @see https://github.com/Droogans/unmaintainable-code
 * @param {string} voice 
 * @param {string} input 
 * @returns {void}
 */
function nextTurn(voice, input) {
	const dispatch = store.dispatch;
	const state = store.getState();
	if (state.game.currentTurn !== state.game.numberOfTurns &&
		state.game.running) {
		dispatch(addTurn(voice, input));
		window.scrollTo(0,document.body.scrollHeight);
		const indexTurn = state.game.currentTurn
		const { model } = store.getState()
			.turn[indexTurn]
		if (indexTurn > 0) {
			const lastModel = state.turn[indexTurn - 1].model;
			const lastVoice = state.turn[indexTurn - 1].voice;
			const lastVoiceLanguage = getLanguageVoice(lastVoice);
			const availableVoices = voices.filter(e => e !== lastVoice)
			const newVoiceIndex = Math.round(Math.random() * (availableVoices.length - 1))
			const isEnglishVoice = state.game.erasmus ? ["en-US", "en-GB"].indexOf(availableVoices[newVoiceIndex]) !== -1 : [
				"en-US", "en-GB"].indexOf(lastVoiceLanguage) !== -1
			//Erasmus
			if (state.game.erasmus) {
				dispatch(new Action(CHANGE_VOICE, {
					index: indexTurn,
					voice: availableVoices[newVoiceIndex]
				}))
				dispatch(new Action(CHANGE_MODEL, {
					index: indexTurn,
					model: 'en-US'
				}))
			}
			//londonCalling
			if (state.game.londonCalling && isEnglishVoice) {
				const oppositeVoices = voices.filter(e => {
					return ((lastVoiceLanguage) === "en-US") ?
						e.slice(0, 5) === 'en-GB' :
						e.slice(0, 5) === 'en-US';
				});
				const random = Math.round(Math.random() * (oppositeVoices.length - 1));
				const oppositeVoice = oppositeVoices[random];
				dispatch(new Action(CHANGE_VOICE, {
					index: indexTurn,
					voice: oppositeVoice
				}))
				dispatch(new Action(CHANGE_MODEL, {
					index: indexTurn,
					model: getLanguageVoice(oppositeVoice) === 'en-US' ? 'en-GB' : 'en-US'
				}))
			}
		} else {
			const lang = getLanguageVoice(voice)
			if (state.game.londonCalling && ["en-GB", "en-US"].indexOf(lang) !== -1) {
				dispatch(new Action(CHANGE_MODEL, {
					index: 0,
					model: lang === "en-US" ? "en-GB" : "en-US"
				}))
			}
		}
		dispatch(new Action(COMPUTING_TURN_NB, { index: indexTurn }))
		getTextToSpeech(state.game.currentTurn);
	} else {
		dispatch(new Action(SESSION_SAVING))
		saveSession(store.getState())
			.then(res => {
				dispatch(new Action(SESSION_SAVED, res.data))
				dispatch(new Action(GAME_END))
				window.scrollTo(0, 0);
			})
			.catch(err => {
				console.error("err");
			})
	}
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
