const crypto = require('crypto');

/**
 * Calculate password hash from password string and salt
 * @param  {string} password password text
 * @param  {string} salt     salt
 * @return {string}          password hash
 */
function createPasswordHash(password, salt) {
  const hash = crypto.createHash('sha256');
  hash.update(password + salt);
  return hash.digest('hex');
}

module.exports = createPasswordHash;
