const validateAccessKey = require('app/accessKey/validateAccessKey');
const createBoard = require('app/board/createBoard');

function boardCreate(db) {
  return (request, reply) => (
    validateAccessKey(db, request.headers['x-auth-key'])
      .then((userId) => {
        if (!userId) {
          throw new Error('Unauthorized');
        }
        return userId;
      })
     .then(userId => createBoard(db, userId, request.payload))
     .then((board) => {
       reply(board);
     })
  );
}

module.exports = boardCreate;
