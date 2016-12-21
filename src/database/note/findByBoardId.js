function findByBoardId(db, boardId) {
  return db('notes').where('boardId', boardId);
}

module.exports = findByBoardId;
