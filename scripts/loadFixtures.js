const createUser = require('app/user/createUser');
const userQueries = require('app/database/queries/userQueries');
const boardQueries = require('app/database/queries/boardQueries');
const notesQueries = require('app/database/queries/notesQueries');
const db = require('app/database/connection');
const notesFixtures = require('./fixtures/notes');

const logger = console;

const users = [
  {
    email: 'test@example.com',
    password: 'test',
  },
  {
    email: 'test2@example.com',
    password: 'test2',
  },
];

const boards = [
  {
    id: 1,
    userId: 1,
    name: 'Things to do',
  },
  {
    id: 2,
    userId: 1,
    name: 'Positioning test',
  },
];

const connection = db.connect();

let promises = [];
users.forEach((user) => {
  promises.push(
    userQueries.create(connection, createUser(user))
  );
});

Promise.all(promises)
    .then(() => {
      promises = [];
      boards.forEach((board) => {
        promises.push(
          boardQueries.saveBoard(connection, board)
        );
      });

      return Promise.all(promises);
    })
    .then(() => {
      const notes = notesFixtures;
      promises = [];
      notes.forEach((note) => {
        promises.push(
          notesQueries.create(connection, note)
        );
      });

      return Promise.all(promises);
    })
    .then(() => {
      db.disconnect();
    })
    .catch((err) => {
      logger.log(err);
      db.disconnect();
    });
