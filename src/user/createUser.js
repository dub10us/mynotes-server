const crypto = require('crypto');
const createPasswordHash = require('app/user/createPasswordHash');

/**
 * Create new user object with calculated password hash
 * @param  {string} email    email
 * @param  {string} password password (not encoded)
 * @return {Object}          use object
 */
function createUser({ email, password }) {
  const salt = crypto.randomBytes(32).toString('hex');

  const userData = {
    email,
    salt,
    password: createPasswordHash(password, salt),
  };
  return userData;
}

module.exports = createUser;
