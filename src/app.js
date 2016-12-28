'use strict';

const Hapi = require('hapi');
const hapiCors = require('hapi-cors');
const config = require('config');
const dbConnection = require('app/database/connection');
const createRoutes = require('app/routing/createRoutes');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: config.get('httpServer.port')
});

const db = dbConnection.connect();

createRoutes(server, db);

server.register({
  register: hapiCors,
  options: {
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
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
