const crypto = require('crypto');

/**
 * Generate given number of random bytes (async)
 * @param  {int} numberOfBytes number of bytes
 * @return {Promise} random bytes as a Buffer
 */
function generateEntropy(numberOfBytes) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(numberOfBytes, (err, buf) => {
      if (err) {
        reject(err);
      }
      resolve(buf);
    });
  });
}

module.exports = generateEntropy;
