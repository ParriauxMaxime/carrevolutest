import axios from "axios";
export const GET_SOUND = "GET_SOUND"

export function getSound(fileUrl) {
    return {
		type: GET_SOUND,
        payload: fileUrl
	}
}