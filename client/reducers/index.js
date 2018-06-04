import { combineReducers } from 'redux';

import game from './game';
import session from './session';
import turn from './turn';

export default combineReducers({
    game,
    session,
    turn,
});