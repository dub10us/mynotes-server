const validateAccessKey = require('app/accessKey/validateAccessKey');
const updateNote = require('app/note/updateNote');

function updateNoteHandler(db) {
  return (request, reply) => (
    validateAccessKey(db, request.headers['x-auth-key'])
      .then((userId) => {
        if (!userId) {
          throw new Error('Unauthorized');
        }
        return userId;
      })
      .then(userId => updateNote(db, userId, request.params.id, request.payload))
      .then((note) => {
        reply(note);
      })
  );
}

module.exports = updateNoteHandler;
