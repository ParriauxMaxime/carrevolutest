import { combineReducers } from 'redux';

import text from './text';
import game from './game';
import voice from './voice';
import sound from './sound';
import iteration from './iteration';

export default combineReducers({
    text,
    game,
    sound,
    voice,
    iteration
});