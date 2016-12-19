function findByEmail(db, email) {
  return db('users').where('email', email);
}

module.exports = findByEmail;
