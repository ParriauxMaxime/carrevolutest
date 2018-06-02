export const TEXT_INPUT = 'LOAD_REMINDERS';

export function textInput(value) {
	return {
		type: TEXT_INPUT,
		payload: value
	}
}
