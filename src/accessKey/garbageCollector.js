const moment = require('moment');
const accessKeyQueries = require('app/database/queries/accessKeyQueries');

function createGarbageCollector(db) {
  return () => {
    const now = moment();
    accessKeyQueries.removeExpired(db, now).then(() => {});
  };
}

module.exports = {
  start: (db, frequency) => {
    const gc = createGarbageCollector(db);
    setInterval(gc, frequency * 1000);
  }
};
