import db from '../db/index.js'
import bcrypt from 'bcrypt'

export const signUp = async (req, res) => {
    const { full_name, email, password } = req.body
    
    if(!full_name || !email || !password) return res.status(400).json({ message : "Missing required fields" })
    
    const hashedPassword = await bcrypt.hash(password, 10)
    try {
        await db.query('INSERT INTO users(full_name, email, password, role) VALUES ($1, $2, $3, $4)', [full_name, email, hashedPassword, 'USER'])

        res.status(201).json({ message : "User created successfully" })
    } catch(err) {
        if (err.code === '23505') {
            return res.status(409).json({ message: "Email already exists" });
        }
        console.log(err)
        res.status(500).json({ message : "Internal server error" })
    }
}