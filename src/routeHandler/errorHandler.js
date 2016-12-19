const Boom = require('boom');

const logger = console;

function errorHandler(routeHandler) {
  return (request, reply) => {
    routeHandler(request, reply)
      .catch((error) => {
        if (error.message === 'Not found') {
          reply(Boom.notFound('Not found'));
        } else if (error.message === 'Unauthorized') {
          reply(Boom.unauthorized('Unauthorized'));
        } else {
          logger.log(error);
          reply(Boom.badImplementation(error));
        }
      });
  };
}

module.exports = errorHandler;
