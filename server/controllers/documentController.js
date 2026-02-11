import db from '../db/index.js'

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import fs from 'fs'
import { VoyageEmbeddings } from '@langchain/community/embeddings/voyage';

const pdfParse = require('pdf-parse');


const embeddings = new VoyageEmbeddings({
    apiKey: process.env.VOYAGE_AI_API_KEY,
    inputType: "document",
    modelName: "voyage-3"
})
const splitTextIntoChunks = (text, chunkSize) => {
    const chunks = []
    for (let i = 0; i < text.length; i += chunkSize) {
        chunks.push(text.slice(i, i + chunkSize))
    }
    return chunks
}

export const uploadDocument = async (req, res) => {
    if(!req.file) return res.status(400).json({ message : "No file uploaded" })
    
    
    const { originalname, path: filePath, mimetype } = req.file
    const userId = req.user.id

    const client = await db.connect()
    try {
        let rawText = ""
        if(mimetype === 'application/pdf') {
            const dataBuffer = await fs.promises.readFile(filePath)
            const data = await pdfParse(dataBuffer)
            rawText = data.text
        } else {
            rawText = fs.readFileSync(filePath, 'utf-8')
        }

        if(!rawText) return res.status(400).json({ message : "Could not extract text from file" })

        await client.query('BEGIN')
        const documentResult = await client.query(`INSERT INTO documents (user_id, filename, file_type,status, file_url) VALUES ($1, $2, $3, 'INDEXED', $4) RETURNING id`, [userId, originalname, mimetype, filePath])
        const documentId = documentResult.rows[0].id

        const chunks = splitTextIntoChunks(rawText, 1000)

        for(const chunk of chunks) {
            const vector = await embeddings.embedQuery(chunk)

            await client.query('INSERT INTO document_chunks (document_id, content, embedding) VALUES ($1, $2, $3)', [documentId, chunk, JSON.stringify(vector)])

        }
        
        await client.query('COMMIT')
        fs.unlinkSync(filePath)

        res.status(201).json({ message : "Document processed and indexed successfully" })

    } catch(err) {
        await client.query('ROLLBACK')
        console.log(err)
        res.status(500).json({ message : "Internal server error" })
    } finally {
        client.release()
    }
}