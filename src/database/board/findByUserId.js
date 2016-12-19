function findByUserId(db, userId) {
  return db('boards').where('userId', userId);
}

module.exports = findByUserId;
