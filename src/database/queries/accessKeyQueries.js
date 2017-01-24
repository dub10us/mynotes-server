function findByKey(db, key) {
  return db('accessKeys').where('key', key);
}

function findByKeyAndRefreshKey(db, key, refreshKey) {
  return db('accessKeys')
    .where('key', key)
    .andWhere('refreshKey', refreshKey);
}

function create(db, accessKeyData) {
  return db('accessKeys').insert(accessKeyData);
}

/**
 * Remove access key expired at a date
 * @param  {Object}  db   knex instance
 * @param  {Object}  date momentjs date
 * @return {Promise}
 */
function removeExpired(db, date) {
  return db('accessKeys')
    .where('refreshKeyExpiresAt', '<', date.format())
    .delete();
}

module.exports = {
  findByKey,
  findByKeyAndRefreshKey,
  create,
  removeExpired
};
