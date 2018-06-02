import { combineReducers } from 'redux';

import text from './text';
import iteration from './iteration';

export default combineReducers({
    text,
    iteration
});