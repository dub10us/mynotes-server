const logger = console;

const dropSchema = require('app/database/dropSchema');

dropSchema()
    .then(() => {
      logger.log('Database deleted');
    }).catch((err) => {
      logger.log(err);
    });
