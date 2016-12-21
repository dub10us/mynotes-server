function saveNote(db, noteData) {
  return db('notes').insert(noteData);
}

module.exports = saveNote;
