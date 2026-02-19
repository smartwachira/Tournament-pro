import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

//Use the connection string directly

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

//Diagnostic: Log successful connection
pool.on('connect',()=>{
    console.log('⚽ Database connected: The pitch is ready.')
});

pool.on('error', (err)=>{
    console.error('❌ Unexpected error on idle database client', err);
    process.exit(-1);
});

export const query = (text, params) => pool.query(text, params);
export default pool;
