import db from '../utils/db';
db.get('sessions').remove().value();
