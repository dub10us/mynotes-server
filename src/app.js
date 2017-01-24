'use strict';

const Hapi = require('hapi');
const hapiCors = require('hapi-cors');
const config = require('config');
const dbConnection = require('app/database/connection');
const createRoutes = require('app/routing/createRoutes');
const accessKeyGc = require('app/accessKey/garbageCollector');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: config.get('httpServer.host'),
  port: config.get('httpServer.port')
});

const db = dbConnection.connect();

createRoutes(server, db);

server.register({
  register: hapiCors,
  options: config.get('cors')
}).then(() => {
  // Start the server
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('HTTP port env:', process.env.PORT);
    console.log('Server running at:', server.info.uri);

    accessKeyGc.start(db, config.accessKey.gcFrequency);
    console.log(`Started access key gc with ${config.accessKey.gcFrequency} seconds frequency`);
  });
});
