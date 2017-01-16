const boardQueries = require('app/database/queries/boardQueries');
const filterInputData = require('app/board/filterInputData');

function updateBoard(db, userId, id, dataToUpdate) {
  return boardQueries.findByIdAndUserId(db, id, userId)
    .then((boards) => {
      if (!boards.length) {
        throw new Error('Not found');
      }

      const data = filterInputData(dataToUpdate);

      if (!Object.keys(data).length) {
        return Promise.resolve();
      }

      return boardQueries.update(db, id, data);
    })
    .then(() => boardQueries.findByIdAndUserId(db, id, userId))
    .then(boards => boards[0]);
}

module.exports = updateBoard;
