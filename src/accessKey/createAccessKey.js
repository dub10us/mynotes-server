const moment = require('moment');
const generateEntropy = require('app/accessKey/generateEntropy');

module.exports = function (keyLifetime, refreshKeyLifetime) {
    /**
     * Create new access key
     * @param  {int} userId token's owner id
     * @return {Object}     token object
     */
  function createAccessKey(userId) {
    const now = moment();
    const accessKey = {
      key: '',
      keyExpiresAt: now.clone().add(keyLifetime, 'seconds').format(),
      refreshKey: '',
      refreshKeyExpiresAt: now.add(refreshKeyLifetime, 'seconds').format(),
      userId,
    };

    const keyLength = 32;

    return Promise.all([
      generateEntropy(keyLength),
      generateEntropy(keyLength),
    ]).then((entropy) => {
      accessKey.key = entropy[0].toString('hex');
      accessKey.refreshKey = entropy[1].toString('hex');

      return accessKey;
    });
  }

  return createAccessKey;
};
