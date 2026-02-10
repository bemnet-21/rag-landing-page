import pkg from 'pg'
import dotenv from 'dotenv'

const { Pool } = pkg
dotenv.config({ quiet: true })

const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
})

pool.on('connect', () => {
    console.log("Connected to PostgreSQL database")
})


export default pool