import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import documentRoutes from './routes/documentRoutes.js'

const app = express()

dotenv.config({ quiet: true })

const port = process.env.PORT

app.use(cors({
    credentials: true
}))
app.use(express.json())


app.listen(port, () => {
    console.log(`Server is listening to port ${port}`)
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/document', documentRoutes)