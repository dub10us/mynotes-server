const validateAccessKey = require('app/accessKey/validateAccessKey');
const notesQueries = require('app/database/queries/notesQueries');

function notes(db) {
  return (request, reply) => (
    validateAccessKey(db, request.headers['x-auth-key'])
      .then((userId) => {
        if (!userId) {
          throw new Error('Unauthorized');
        }
        return userId;
      })
      .then((userId) => {
        const boardId = request.params.boardId;
        return notesQueries.findByBoardIdAndUserId(db, boardId, userId);
      })
      .then((boardNotes) => {
        if (!boardNotes.length) {
          throw new Error('Not found');
        }
        reply(boardNotes);
      })
  );
}

module.exports = notes;
