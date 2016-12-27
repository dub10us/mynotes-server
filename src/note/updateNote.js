const notesQueries = require('app/database/notesQueries');

function prepareDataToUpdate(dataToUpdate) {
  const filtered = {};

  if (dataToUpdate.x) {
    filtered.x = dataToUpdate.x;
    if (filtered.x > 1.0) { filtered.x = 1.0; }
    if (filtered.x < 0.0) { filtered.x = 0.0; }
  }
  if (dataToUpdate.y) {
    filtered.y = dataToUpdate.y;
    if (filtered.y > 1.0) { filtered.y = 1.0; }
    if (filtered.y < 0.0) { filtered.y = 0.0; }
  }
  if (dataToUpdate.z) {
    filtered.z = dataToUpdate.z;
    if (filtered.z > 9999) { filtered.z = 9999; }
    if (filtered.z < 0) { filtered.z = 0; }
  }
  if (dataToUpdate.color) {
    filtered.color = dataToUpdate.color;
  }
  if (dataToUpdate.content) {
    filtered.content = dataToUpdate.content;
  }

  return filtered;
}

function updateNote(db, userId, id, dataToUpdate) {
  return notesQueries.findByIdAndUserId(db, id, userId)
    .then((notes) => {
      if (!notes.length) {
        throw new Error('Not found');
      }

      const data = prepareDataToUpdate(dataToUpdate);
      return notesQueries.update(db, id, data);
    })
    .then(() => notesQueries.findByIdAndUserId(db, id, userId))
    .then(notes => notes[0]);
}

module.exports = updateNote;
