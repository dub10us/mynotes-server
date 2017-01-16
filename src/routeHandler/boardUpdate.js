const validateAccessKey = require('app/accessKey/validateAccessKey');
const updateBoard = require('app/board/updateBoard');

function boardUpdate(db) {
  return (request, reply) => (
    validateAccessKey(db, request.headers['x-auth-key'])
      .then((userId) => {
        if (!userId) {
          throw new Error('Unauthorized');
        }
        return userId;
      })
     .then(userId => updateBoard(db, userId, request.params.boardId, request.payload))
     .then((board) => {
       reply(board);
     })
  );
}

module.exports = boardUpdate;
