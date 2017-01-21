const validateAccessKey = require('app/accessKey/validateAccessKey');
const deleteBoard = require('app/board/deleteBoard');

function boardDelete(db) {
  return (request, reply) => (
    validateAccessKey(db, request.headers['x-auth-key'])
      .then((userId) => {
        if (!userId) {
          throw new Error('Unauthorized');
        }
        return userId;
      })
      .then(userId => deleteBoard(db, userId, request.params.boardId))
      .then(() => reply({ status: 'deleted' }))
      .catch((err) => {
        if (err.message === 'Board is not empty') {
          reply({
            status: 'not_deleted',
            message: err.message
          });
        } else {
          throw err;
        }
      })
  );
}

module.exports = boardDelete;
