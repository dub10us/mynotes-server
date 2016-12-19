const moment = require('moment');
const findByKey = require('app/database/accessKey/findByKey');

function validateAccessKey(db, accessKey) {
  return findByKey(db, accessKey).then((accessKeys) => {
    if (!accessKeys.length) {
      return false;
    }

    const now = moment();
    const keyExpiresAt = moment(accessKeys[0].keyExpiresAt);

    if (now.isAfter(keyExpiresAt)) {
      return false;
    }

    return accessKeys[0].userId;
  });
}

module.exports = validateAccessKey;
