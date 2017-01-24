const config = require('config');
const findByEmailAndPassword = require('app/database/user/findByEmailAndPassword');
const createAccessKey = require('app/accessKey/createAccessKey')(
    config.get('accessKey.keyLifetime'),
    config.get('accessKey.refreshKeyLifetime')
);
const accessKeyQueries = require('app/database/queries/accessKeyQueries');

function userLogin(db) {
  return (request, reply) => {
    const email = request.payload.email;
    const password = request.payload.password;

    return findByEmailAndPassword(db, email, password).then((user) => {
      if (!user || !user.id) {
        throw new Error('Not found');
      }

      let accessKey = null;
      return createAccessKey(user.id).then((accessKeyData) => {
        accessKey = accessKeyData;
        return accessKeyQueries.create(db, accessKey);
      }).then(() => {
        reply(accessKey);
      });
    });
  };
}

module.exports = userLogin;
