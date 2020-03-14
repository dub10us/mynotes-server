const createSchema = require('app/database/createSchema');
const logger = console;




  createSchema.createTables()
   .then(() => {
      logger.log('Tables created');
    }).catch((err) => {
      logger.log(err);
    });