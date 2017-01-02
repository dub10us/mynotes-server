function findByBoardIdAndUserId(db, boardId, userId) {
  return db('notes')
    .select('notes.*')
    .join('boards', 'notes.boardId', '=', 'boards.id')
    .where('notes.boardId', boardId)
    .andWhere('boards.userId', userId);
}

function findByIdAndUserId(db, id, userId) {
  return db('notes')
    .select('notes.*')
    .join('boards', 'notes.boardId', '=', 'boards.id')
    .where('notes.id', id)
    .andWhere('boards.userId', userId);
}

function create(db, noteData) {
  return db('notes').insert(noteData);
}

function update(db, id, noteData) {
  return db('notes')
    .where('id', id)
    .update(noteData);
}

function remove(db, id) {
  return db('notes')
    .where('id', id)
    .delete();
}

module.exports = {
  findByBoardIdAndUserId,
  findByIdAndUserId,
  create,
  update,
  remove,
};
