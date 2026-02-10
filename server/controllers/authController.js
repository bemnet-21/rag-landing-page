import db from '../db/index.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/generateToken.js'

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

export const login = async (req, res) => {
    const { email, password } = req.body
    if(!email || !password) return res.status(400).json({ message : "Missing required fields" })

    try {
        const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email])
        if(userResult.rows.length === 0) return res.status(401).json({ message : "Invalid credentials" })
        const user = userResult.rows[0]
        const isValid = await bcrypt.compare(password, user.password)

        if(!isValid) return res.status(401).json({ message : "Invalid credentials" })
        const token = generateToken(user)

        res.status(200).json({
            message : "Logged in successfully",
            token,
            user: {
                id: user.id,
                name: user.full_name,
                role: user.role,
                email: user.email
            }
        })

    } catch(err) {
        console.log(err)
        res.status(500).json({ message : "Internal server error" })
    }
}