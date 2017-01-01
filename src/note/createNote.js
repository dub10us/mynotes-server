const boardQueries = require('app/database/queries/boardQueries');
const notesQueries = require('app/database/queries/notesQueries');
const filterInputData = require('app/note/filterInputData');

function createNote(db, userId, boardId, inputData) {
  return boardQueries.findByIdAndUserId(db, boardId, userId)
    .then(() => {
      const data = filterInputData(inputData);
      data.boardId = boardId;

      return notesQueries.create(db, data);
    })
    .then(insertIds => notesQueries.findByIdAndUserId(db, insertIds[0], userId))
    .then(notes => notes[0]);
}

module.exports = createNote;
