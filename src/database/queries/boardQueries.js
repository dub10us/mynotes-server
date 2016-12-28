function findByUserId(db, userId) {
  return db('boards').where('userId', userId);
}

function findByIdAndUserId(db, id, userId) {
  return db('boards').where('id', id).andWhere('userId', userId);
}

function saveBoard(db, boardData) {
  return db('boards').insert(boardData);
}

module.exports = {
  findByUserId,
  findByIdAndUserId,
  saveBoard
};
