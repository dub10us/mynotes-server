function saveUser(db, accessKeyData) {
  return db('accessKeys').insert(accessKeyData);
}

module.exports = saveUser;
