

const config = require('ez-config');

let db = null;

/**
 * Make a database connection
 * @param {boolean} selectDb whether to select database or not
 * @return {Object} knex instance
 */
function connect(selectDb = true) {
  if (db !== null) {
    throw new Error('Trying to connect to the database twice');
  }

  const connectionConfig = config.get('database');

  if (!selectDb) {
    delete connectionConfig.database;
  }

  db = require('knex')({
    client: 'mysql',
    connection: connectionConfig,
  });

  return db;
}

/**
 * Destroy db connection
 */
function disconnect() {
  if (db === null) {
    throw new Error('Cannot disconnect from the database, there is no active connection');
  }

  db.destroy();
  db = null;
}

module.exports = {
  connect,
  disconnect,
};
