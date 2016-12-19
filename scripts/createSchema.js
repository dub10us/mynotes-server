const createSchema = require('app/database/createSchema');
const logger = console;

createSchema.createDatabase()
    .then(() => {
      logger.log('Database created');
      return createSchema.createTables();
    }).then(() => {
      logger.log('Tables created');
    }).catch((err) => {
      logger.log(err);
    });
