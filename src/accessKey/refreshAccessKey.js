const moment = require('moment');
const createAccessKey = require('app/accessKey/createAccessKey');

module.exports = keyLifetime => (
  /**
   * Refresh access key
   * @param  {[type]} expiredAccessKey [description]
   * @return {[type]}                  [description]
   */
  function refreshAccessKey(expiredAccessKey) {
    const now = moment();
    const expiresAt = moment(expiredAccessKey.keyExpiresAt);
    const refreshKeyExpiresAt = moment(expiredAccessKey.refreshKeyExpiresAt);

    if (
      !expiredAccessKey.userId ||
      !expiredAccessKey.key ||
      !expiredAccessKey.keyExpiresAt ||
      !expiredAccessKey.refreshKey ||
      !expiredAccessKey.refreshKeyExpiresAt) {
      throw new Error('Invalid key');
    }

    if (now.isBefore(expiresAt)) {
      throw new Error('The key is not expired, so does not need to be refreshed');
    }

    if (now.isAfter(refreshKeyExpiresAt)) {
      throw new Error('The refreshKey is expired');
    }

    return createAccessKey(keyLifetime, 0)(expiredAccessKey.userId) // why test passes?
      .then((key) => {
        const newKey = Object.assign({}, key);
        newKey.refreshKeyExpiresAt = expiredAccessKey.refreshKeyExpiresAt;
        return newKey;
      });
  }
);
