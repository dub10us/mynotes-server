function findByKey(db, key) {
  return db('accessKeys').where('key', key);
}

module.exports = findByKey;
