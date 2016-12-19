const config = require('ez-config');
const db = require('app/database/connection');

/**
 * Create empty database
 * @return {Promise}
 */
function createDatabase() {
  const knex = db.connect(false);
  const database = config.get('database.database');

  return knex
        .raw(`CREATE DATABASE ${database}`)
        .then(() => {
          db.disconnect();
        })
        .catch((err) => {
          db.disconnect();
          throw err;
        });
}

/**
 * Create tables
 * @return {Promise}
 */
function createTables() {
  const knex = db.connect();

  return knex.schema.createTableIfNotExists('users', (table) => {
    table.increments().unsigned();
    table.string('email', 255).unique().notNullable();
    table.string('password', 64).notNullable();
    table.string('salt', 64).notNullable();
  }).then(() => knex.schema.createTableIfNotExists('accessKeys', (table) => {
    table.string('key', 64).unique().notNullable();
    table.string('keyExpiresAt', 32).notNullable();
    table.string('refreshKey', 64).notNullable();
    table.string('refreshKeyExpiresAt', 32).notNullable();
    table.integer('userId').unsigned().notNullable();
    table.foreign('userId').references('users.id');
  })).then(() => knex.schema.createTableIfNotExists('boards', (table) => {
    table.increments().unsigned();
    table.integer('userId').unsigned().notNullable();
    table.foreign('userId').references('users.id');
    table.string('name', 255);
  })).then(() => knex.schema.createTableIfNotExists('notes', (table) => {
    table.increments().unsigned();
    table.integer('boardId').unsigned().notNullable();
    table.foreign('boardId').references('boards.id');
    table.string('name', 255).notNullable();
    table.float('x', 8, 4).notNullable();
    table.float('y', 8, 4).notNullable();
    table.float('z', 8, 4).notNullable();
    table.string('color', 16).notNullable();
    table.text('content');
  }))
  .then(() => {
    db.disconnect();
  })
  .catch(() => {
    db.disconnect();
  });
}

module.exports = {
  createDatabase,
  createTables,
};
