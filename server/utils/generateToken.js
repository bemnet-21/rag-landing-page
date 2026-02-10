import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const secretKey = process.env.JWT_SECRET
const expires = process.env.JWT_EXPIRES

export const generateToken = (user) => {
   const payload = {
        id: user.id,
        role: user.role,
        email: user.email,
        name: user.full_name
   }

   return jwt.sign(
        payload,
        secretKey,
        { expiresIn: expires }
   )
}