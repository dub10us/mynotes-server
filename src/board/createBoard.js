const boardQueries = require('app/database/queries/boardQueries');
const filterInputData = require('app/board/filterInputData');

function createBoard(db, userId, requestData) {
  const data = filterInputData(requestData);
  data.userId = userId;

  if (!Object.keys(data).length) {
    return Promise.resolve();
  }

  return boardQueries.create(db, data)
    .then(insertIds => boardQueries.findByIdAndUserId(db, insertIds[0], userId))
    .then(boards => boards[0]);
}

module.exports = createBoard;
