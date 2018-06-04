import { 
    PLAY_SOUND, 
    STOP_SOUND, 
    RESET, 
    ADD_TURN, 
    GOT_AUDIO, 
    LOADING_AUDIO, 
    GOT_OUTPUT, 
    LOADING_OUTPUT, 
    CHANGE_MODEL,
    CHANGE_VOICE,
    SESSION_LOAD
} from "../actions/game";

const defaultState = []

const Turn = (props) => ({
    index: 0,
    model: 'en-US',
    voice: 'en-US_MichaelVoice',
    input: '',
    loadingAudio: false,
    loadingOutput: false,
    playingAudio: false,
    audio: null,
    audioFileName: null,
    output: null,
    ...props
})

export default function (state = defaultState, action) {
    const index = (state && state.length !== 0) ?
        state[state.length - 1].index + 1 :
        0;
        console.log(action);
    switch (action.type) {
        case ADD_TURN: {
            return [...state, new Turn({
                index,
                voice: action.payload.voice,
                model: action.payload.model,
                input: action.payload.input,
            })]
        }
        case LOADING_AUDIO: {
            const newState = [...state];
            try {
                newState[action.payload.index].loadingAudio = true;
                return newState;
            }
            catch(e) {
                return state
            }
        }
        case GOT_AUDIO: {
            const newState = [...state];
            try {
                newState[action.payload.index].loadingAudio = false;                
                newState[action.payload.index].audio = action.payload.fileUrl;
                newState[action.payload.index].audioFileName = action.payload.filename;
                return newState;
            }
            catch(e) {
                return state
            }
        }
        case PLAY_SOUND: {
            const newState = [...state];
            try {
                newState[action.payload.index].playingAudio = true;                
                return newState;
            }
            catch(e) {
                return state
            }
        }
        case CHANGE_MODEL: {
            const newState = [...state];
            try {
                newState[action.payload.index].model = action.payload.model;                
                return newState;
            }
            catch(e) {
                return state
            }
        }
        case CHANGE_VOICE: {
            const newState = [...state];
            try {
                newState[action.payload.index].voice = action.payload.voice;                
                return newState;
            }
            catch(e) {
                return state
            }
        }
        case STOP_SOUND: {
            const newState = [...state];
            try {
                newState[action.payload.index].playingAudio = false;                
                return newState;
            }
            catch(e) {
                return state
            }
        }
        case LOADING_OUTPUT: {
            const newState = [...state];
            try {
                newState[action.payload.index].loadingOutput = true;                
                return newState;
            }
            catch(e) {
                return state
            }
        }
        case GOT_OUTPUT: {
            const newState = [...state];
            try {
                newState[action.payload.index].loadingOutput = false;                
                newState[action.payload.index].output = action.payload.output;
                return newState;
            }
            catch(e) {
                return state
            }
        }
        case SESSION_LOAD: 
            return action.payload.turn
        case RESET: {
            return defaultState
        }

        default:
            return state;
    }
}