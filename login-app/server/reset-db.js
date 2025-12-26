// server/reset-db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'login_app_db',
  password: '', 
  port: 5432,
});

const createTableQuery = `
  DROP TABLE IF EXISTS users;
  
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  );
`;

const resetDb = async () => {
  try {
    console.log('⏳ Resetting database table...');
    await pool.query(createTableQuery);
    console.log('✅ Success! Table "users" created with Email column.');
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    pool.end();
  }
};

resetDb();