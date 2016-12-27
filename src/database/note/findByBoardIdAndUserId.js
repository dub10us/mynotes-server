function findByBoardId(db, boardId, userId) {
  return db('notes')
    .join('boards', 'notes.boardId', '=', 'boards.id')
    .where('notes.boardId', boardId)
    .andWhere('boards.userId', userId);
}

module.exports = findByBoardId;
