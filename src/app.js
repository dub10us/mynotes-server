'use strict';

const Hapi = require('hapi');
const Joi = require('joi');
const config = require('ez-config');
const dbConnection = require('app/database/connection');
const errorHandler = require('app/routeHandler/errorHandler');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: config.get('httpServer.port')
});

const db = dbConnection.connect();

server.route({
  method: 'POST',
  path:'/user/login',
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
  path:'/accessKey/refresh',
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

server.register({
  register: require('hapi-cors'),
  options: {
    headers: ['X-Auth-Key', 'Content-Type', 'Accept'],
    origins: ['http://localhost:3000']
  }
}).then(() => {
  // Start the server
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server running at:', server.info.uri);
  });
});
