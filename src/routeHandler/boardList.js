const validateAccessKey = require('app/accessKey/validateAccessKey');
const findByUserId = require('app/database/board/findByUserId');

function boardList(db) {
  return (request, reply) => (
    validateAccessKey(db, request.headers['x-auth-key']).then((userId) => {
      if (!userId) {
        throw new Error('Unauthorized');
      }
      return userId;
    })
    .then(userId => findByUserId(db, userId))
    .then((boards) => {
      reply(boards);
    })
  );
}

module.exports = boardList;
