import { combineReducers } from 'redux';

import game from './game';
import turn from './turn';

export default combineReducers({
    game,
    turn,
});