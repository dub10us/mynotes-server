const boardQueries = require('app/database/queries/boardQueries');
const notesQueries = require('app/database/queries/notesQueries');

function deleteBoard(db, userId, id) {
  return boardQueries.findByIdAndUserId(db, id, userId)
    .then((boards) => {
      if (!boards.length) {
        throw new Error('Not found');
      }
      return notesQueries.findByBoardIdAndUserId(db, boards[0].id, userId);
    })
    .then((notes) => {
      if (notes.length) {
        throw new Error('Board is not empty');
      }
      return boardQueries.remove(db, id);
    });
}

module.exports = deleteBoard;
