const moment = require('moment');
const accessKeyQueries = require('app/database/queries/accessKeyQueries');

function validateAccessKey(db, accessKey) {
  return accessKeyQueries.findByKey(db, accessKey).then((accessKeys) => {
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
