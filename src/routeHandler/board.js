const validateAccessKey = require('app/accessKey/validateAccessKey');
const findByBoardId = require('app/database/note/findByBoardId');

function boardList(db) {
  return (request, reply) => (
    validateAccessKey(db, request.headers['x-auth-key']).then((userId) => {
      if (!userId) {
        throw new Error('Unauthorized');
      }
    })
    .then(() => {
      const boardId = request.params.boardId;
      return findByBoardId(db, boardId);
    })
    .then((boards) => {
      if (!boards.length) {
        throw new Error('Not found');
      }
      reply(boards);
    })
  );
}

module.exports = boardList;
