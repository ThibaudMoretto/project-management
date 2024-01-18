import pg from 'pg';

require('dotenv').config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1,
});

export default pool;
