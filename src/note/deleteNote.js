const notesQueries = require('app/database/queries/notesQueries');

function deleteNote(db, userId, id) {
  return notesQueries.findByIdAndUserId(db, id, userId)
    .then((notes) => {
      if (!notes.length) {
        throw new Error('Not found');
      }
      return notesQueries.remove(db, id);
    });
}

module.exports = deleteNote;
