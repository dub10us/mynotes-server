const config = require('ez-config');
const db = require('app/database/connection');

/**
 * Delete database
 * @return {Promise}
 */
function dropSchema() {
  const knex = db.connect(false);
  const database = config.get('database.database');

  return knex
        .raw(`DROP DATABASE ${database}`)
        .then(() => {
          knex.destroy();
        })
        .catch(() => {
          knex.destroy();
        });
}

module.exports = dropSchema;
