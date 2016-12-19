function saveUser(db, userData) {
  return db('users').insert(userData);
}

module.exports = saveUser;
