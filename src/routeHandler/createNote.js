const validateAccessKey = require('app/accessKey/validateAccessKey');
const createNote = require('app/note/createNote');

function updateNoteHandler(db) {
  return (request, reply) => (
    validateAccessKey(db, request.headers['x-auth-key'])
      .then((userId) => {
        if (!userId) {
          throw new Error('Unauthorized');
        }
        return userId;
      })
      .then(userId => createNote(db, userId, request.params.boardId, request.payload))
      .then((note) => {
        reply(note);
      })
  );
}

module.exports = updateNoteHandler;
