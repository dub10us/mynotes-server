const validateAccessKey = require('app/accessKey/validateAccessKey');
const boardQueries = require('app/database/queries/boardQueries');

function board(db) {
  return (request, reply) => (
    validateAccessKey(db, request.headers['x-auth-key']).then((userId) => {
      if (!userId) {
        throw new Error('Unauthorized');
      }
      return userId;
    })
    .then((userId) => {
      const boardId = request.params.boardId;
      return boardQueries.findByIdAndUserId(db, boardId, userId);
    })
    .then((boards) => {
      if (!boards.length) {
        throw new Error('Not found');
      }
      reply(boards[0]);
    })
  );
}

module.exports = board;
