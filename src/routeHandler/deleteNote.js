const validateAccessKey = require('app/accessKey/validateAccessKey');
const deleteNote = require('app/note/deleteNote');

function deleteNoteHandler(db) {
  return (request, reply) => (
    validateAccessKey(db, request.headers['x-auth-key'])
      .then((userId) => {
        if (!userId) {
          throw new Error('Unauthorized');
        }
        return userId;
      })
      .then(userId => deleteNote(db, userId, request.params.id))
      .then(() => reply({ status: 'deleted' }))
  );
}

module.exports = deleteNoteHandler;
