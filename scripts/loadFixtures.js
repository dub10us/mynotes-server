const createUser = require('app/user/createUser');
const saveUser = require('app/database/user/saveUser');
const saveBoard = require('app/database/board/saveBoard');
const db = require('app/database/connection');
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
    userId: 1,
    name: 'Board 1',
  },
  {
    userId: 1,
    name: 'Board 2',
  },
];


const connection = db.connect();

let promises = [];
users.forEach((user) => {
  promises.push(
        saveUser(connection, createUser(user)),
    );
});

Promise.all(promises)
    .then(() => {
      promises = [];
      boards.forEach((board) => {
        promises.push(
                saveBoard(connection, board),
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
