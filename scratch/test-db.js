const { Client } = require('pg');
require('dotenv').config();

async function testConnection() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connection successful!');
    const res = await client.query('SELECT NOW()');
    console.log('Server time:', res.rows[0].now);
    await client.end();
  } catch (err) {
    console.error('Connection error:', err.stack);
  }
}

testConnection();
