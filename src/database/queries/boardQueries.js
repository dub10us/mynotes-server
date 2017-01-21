function findByUserId(db, userId) {
  return db('boards').where('userId', userId);
}

function findByIdAndUserId(db, id, userId) {
  return db('boards').where('id', id).andWhere('userId', userId);
}

function saveBoard(db, boardData) {
  return db('boards').insert(boardData);
}

function create(db, boardData) {
  return db('boards')
    .insert(boardData);
}

function update(db, id, boardData) {
  return db('boards')
    .where('id', id)
    .update(boardData);
}

module.exports = {
  findByUserId,
  findByIdAndUserId,
  saveBoard,
  create,
  update
};
