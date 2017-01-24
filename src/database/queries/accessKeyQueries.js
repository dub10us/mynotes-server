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

module.exports = {
  findByKey,
  findByKeyAndRefreshKey,
  create
};
