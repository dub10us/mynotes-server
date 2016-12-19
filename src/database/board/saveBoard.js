function saveBoard(db, boardData) {
  return db('boards').insert(boardData);
}

module.exports = saveBoard;
