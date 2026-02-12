import pkg from 'pkg'
import dotenv from 'dotenv';

dotenv.config();

const { Pool }  = pkg;

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'tournament_db',
  password: 'Iyano502@', // Use the RAW password here, no %40
  port: 5432,
});
pool.on("connect",()=>{
    console.log('⚽ Database connected: The pitch is ready.');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle database client', err);
  process.exit(-1);
});

export const query = (text, params) => pool.query(text, params);
export default pool;