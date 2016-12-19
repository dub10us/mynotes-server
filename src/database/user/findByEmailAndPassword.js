const findByEmail = require('app/database/user/findByEmail');
const createPasswordHash = require('app/user/createPasswordHash');

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

module.exports = findByEmailAndPassword;
