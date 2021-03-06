import low from 'lowdb';
import { resolve as resolvePath } from 'path';
import fileAsyncStorage from 'lowdb/lib/file-async';
import underscoreDb from 'underscore-db';

const db = low(resolvePath(__dirname, '../db.json'), { storage: fileAsyncStorage });
db._.mixin(underscoreDb);
db.defaults({ sessions: [] }).value();

export const _DB = db;

export default db;
