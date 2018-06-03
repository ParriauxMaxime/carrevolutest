export const VOICE_CHANGE = "VOICE_CHANGE"

export function voiceChange(voice) {
	return {
		type: VOICE_CHANGE,
        payload: voice
	}
}
