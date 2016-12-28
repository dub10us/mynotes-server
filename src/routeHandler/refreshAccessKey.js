const config = require('config');
const findByKeyAndRefreshKey = require('app/database/accessKey/findByKeyAndRefreshKey');

const refreshAccessKey = require('app/accessKey/refreshAccessKey')(
    config.get('accessKey.keyLifetime')
);
const saveAccessKey = require('app/database/accessKey/saveAccessKey');

const refreshAccessKeyRouteHandler = db => (
  (request, reply) => {
    const key = request.payload.key;
    const refreshKey = request.payload.refreshKey;

    return findByKeyAndRefreshKey(db, key, refreshKey).then((accessKey) => {
      if (!accessKey.length || !accessKey[0].key) {
        throw new Error('Not found');
      }

      let newAccessKey;
      return refreshAccessKey(accessKey[0])
      .then((refreshedKey) => {
        newAccessKey = refreshedKey;
        return saveAccessKey(db, refreshedKey);
      }).then(() => {
        reply(newAccessKey);
      }).catch((err) => {
        if (err.message === 'The refreshKey is expired') {
          throw new Error('Not found');
        }
        if (err.message === 'The key is not expired, so does not need to be refreshed') {
          throw new Error('Not found');
        }
        throw err;
      });
    });
  }
);

module.exports = refreshAccessKeyRouteHandler;
