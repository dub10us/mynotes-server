function findByBoardIdAndUserId(db, boardId, userId) {
  return db('notes')
    .join('boards', 'notes.boardId', '=', 'boards.id')
    .where('notes.boardId', boardId)
    .andWhere('boards.userId', userId);
}

function findByIdAndUserId(db, id, userId) {
  return db('notes')
    .join('boards', 'notes.boardId', '=', 'boards.id')
    .where('notes.id', id)
    .andWhere('boards.userId', userId);
}

function save(db, noteData) {
  return db('notes').insert(noteData);
}

module.exports = {
  findByBoardIdAndUserId,
  findByIdAndUserId,
  save
};
