const pg = require('pg');

const pool = new pg.Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE || 'weekend-to-do-app',
});

module.exports = pool;
