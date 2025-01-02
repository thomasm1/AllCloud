// index.handler

exports.handler = async (event, context, cb) => {
  const { Client } = require('pg');
  const client = new Client({
                   user: process.env.DB_USER || thomas,
                   host: process.env.DB_HOST || 3.215.230.246,
                   database: process.env.DB_DATABASE || commuterlink,
                   password: process.env.DB_PASSWORD,
                   port: 5432
                 });
  await client.connect();
  // Your other interactions with RDS...
  client.end();
};
