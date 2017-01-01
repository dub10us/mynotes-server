const notesQueries = require('app/database/queries/notesQueries');
const filterInputData = require('app/note/filterInputData');

function updateNote(db, userId, id, dataToUpdate) {
  return notesQueries.findByIdAndUserId(db, id, userId)
    .then((notes) => {
      if (!notes.length) {
        throw new Error('Not found');
      }

      const data = filterInputData(dataToUpdate);
      return notesQueries.update(db, id, data);
    })
    .then(() => notesQueries.findByIdAndUserId(db, id, userId))
    .then(notes => notes[0]);
}

module.exports = updateNote;
