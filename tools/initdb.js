import moment from 'moment';

import db from '../utils/db';

const sessions = db.get('session');
sessions.remove().value();
