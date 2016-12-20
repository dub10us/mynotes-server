function findByKeyAndRefreshKey(db, key, refreshKey) {
  return db('accessKeys')
    .where('key', key)
    .andWhere('refreshKey', refreshKey);
}

module.exports = findByKeyAndRefreshKey;
