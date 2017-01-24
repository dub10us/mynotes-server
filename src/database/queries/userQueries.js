const createPasswordHash = require('app/user/createPasswordHash');

function findByEmail(db, email) {
  return db('users').where('email', email);
}

function findByEmailAndPassword(db, email, password) {
  return findByEmail(db, email)
    .then((users) => {
      if (!users.length) {
        throw new Error('Not found');
      }

      const passwordHash = createPasswordHash(password, users[0].salt);

      return db('users')
        .where('email', email)
        .andWhere('password', passwordHash)
        .then((usersByPassword) => {
          if (!usersByPassword.length) {
            throw new Error('Not found');
          }
          return usersByPassword[0];
        });
    });
}

function create(db, userData) {
  return db('users').insert(userData);
}

module.exports = {
  findByEmail,
  findByEmailAndPassword,
  create
};
