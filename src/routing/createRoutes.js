const errorHandler = require('app/routeHandler/errorHandler');
const Joi = require('joi');

function createRoutes(server, db) {
  server.route({
    method: 'POST',
    path: '/user/login',
    handler: errorHandler(require('app/routeHandler/userLogin')(db)),
    config: {
      validate: {
        payload: {
          email: Joi.string().min(5).max(255).required(),
          password: Joi.string().min(4).max(255).required()
        }
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/accessKey/refresh',
    handler: errorHandler(require('app/routeHandler/refreshAccessKey')(db)),
    config: {
      validate: {
        payload: {
          key: Joi.string().min(64).max(64).required(),
          refreshKey: Joi.string().min(64).max(64).required()
        }
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/user/exists',
    handler: errorHandler(require('app/routeHandler/userExists')(db)),
    config: {
      validate: {
        query: {
          email: Joi.string().min(5).max(255).required()
        }
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/boards',
    handler: errorHandler(require('app/routeHandler/boardList')(db)),
    config: {
      validate: {
        headers: Joi.object({
          'x-auth-key': Joi.string().min(64).max(64).required()
        }).options({ allowUnknown: true })
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/boards/{boardId}',
    handler: errorHandler(require('app/routeHandler/board')(db)),
    config: {
      validate: {
        params: {
          boardId: Joi.number().min(1).required()
        },
        headers: Joi.object({
          'x-auth-key': Joi.string().min(64).max(64).required()
        }).options({ allowUnknown: true })
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/boards/{boardId}/notes',
    handler: errorHandler(require('app/routeHandler/notes')(db)),
    config: {
      validate: {
        params: {
          boardId: Joi.number().min(1).required()
        },
        headers: Joi.object({
          'x-auth-key': Joi.string().min(64).max(64).required()
        }).options({ allowUnknown: true })
      }
    }
  });

  server.route({
    method: 'PATCH',
    path: '/notes/{id}',
    handler: errorHandler(require('app/routeHandler/updateNote')(db)),
    config: {
      validate: {
        params: {
          id: Joi.number().min(1).required()
        },
        headers: Joi.object({
          'x-auth-key': Joi.string().min(64).max(64).required()
        }).options({ allowUnknown: true }),
        payload: {
          x: Joi.number().min(-0.1).max(1.1),
          y: Joi.number().min(-0.1).max(1.1),
          z: Joi.number().min(0).max(9999),
          color: Joi.string().min(7).max(7),
          content: Joi.string().min(1).max(4096)
        }
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/boards/{boardId}/notes',
    handler: errorHandler(require('app/routeHandler/createNote')(db)),
    config: {
      validate: {
        params: {
          boardId: Joi.number().min(1).required()
        },
        headers: Joi.object({
          'x-auth-key': Joi.string().min(64).max(64).required()
        }).options({ allowUnknown: true }),
        payload: {
          x: Joi.number().min(-0.1).max(1.1).required(),
          y: Joi.number().min(-0.1).max(1.1).required(),
          z: Joi.number().min(0).max(9999).required(),
          color: Joi.string().min(7).max(7).required()
        }
      }
    }
  });
}

module.exports = createRoutes;
