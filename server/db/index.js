import pkg from 'pg'
import dotenv from 'dotenv'

const { Pool } = pkg
dotenv.config({ quiet: true })

const pool = new Pool({
    
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    // Don't exit the process; the pool will handle creating a new client
})

pool.on('connect', () => {
    console.log("Connected to PostgreSQL database")
})


export default pool