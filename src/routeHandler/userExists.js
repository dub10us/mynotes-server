const findByEmail = require('app/database/user/findByEmail');

function userExists(db) {
  return (request, reply) => {
    const email = request.query.email;

    return findByEmail(db, email).then((users) => {
      let exists = true;
      if (!users.length) {
        exists = false;
      }

      reply({ exists });
    });
  };
}


module.exports = userExists;
