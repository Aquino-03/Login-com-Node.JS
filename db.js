
import mysql from 'mysql2/promise';
import 'dotenv/config';

const pool = mysql.createPool({
    host: process.env.DB_HOST,  
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306,
    connectionLimit: 10,
    queueLimit:0,
    ssl : false
})

async function testConnection()
{
    try
    {
        const connection = await pool.getConnection()
        console.log('✅ Conexão com o MySQL bem-sucedida!')
        connection.release(); // Libera a conexão de volta para o pool
    }
    catch(error)
    {
        console.error('❌ Erro ao conectar com o MySQL:', error)
    }
}

export default pool
export { testConnection }