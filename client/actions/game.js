import axios from 'axios';
import { getSound } from "./sound";

export const GAME_START = "GAME_START"
export const PLAY_SOUND = "PLAY_SOUND"
export const STOP_SOUND = "STOP_SOUND"

const Action = (type, payload = null) => ({ type, payload });

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

export function gameStart(dispatch, state) {
	dispatch(new Action(GAME_START));
	const model = state.voice.slice(0, 5)
	axios.get(`/api/textToSpeech?text=${state.text.input}&voice=${state.voice}`)
		.then(res => {
			if (!res.data || !res.data.fileUrl) throw 'Fail to get file'
			dispatch(getSound(res.data.fileUrl))
			dispatch(new Action(PLAY_SOUND, res.data.fileUrl))
			axios.get('/api/speechToText' +
					`?filename=${encodeURIComponent(res.data.filename.slice(0, -4))}` +
					`&model=${(models.indexOf(model) !== -1 ? model : "en-US")}`
				)
				.then(res => {
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				})
		})
		.catch(err => { console.error(err) })
}
