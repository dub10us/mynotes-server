const userQueries = require('app/database/queries/userQueries');

function userExists(db) {
  return (request, reply) => {
    const email = request.query.email;

    return userQueries.findByEmail(db, email).then((users) => {
      let exists = true;
      if (!users.length) {
        exists = false;
      }

      reply({ exists });
    });
  };
}


module.exports = userExists;
