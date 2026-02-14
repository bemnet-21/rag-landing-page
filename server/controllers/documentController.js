import db from '../db/index.js'
import dotenv from 'dotenv'

dotenv.config()

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import fs from 'fs'
import { VoyageEmbeddings } from '@langchain/community/embeddings/voyage';

const pdfParse = require('pdf-parse');


const embeddings = new VoyageEmbeddings({
    apiKey: process.env.VOYAGE_AI_API_KEY,
    modelName: "voyage-2"
})
const splitTextIntoChunks = (text, chunkSize) => {
    const chunks = []
    for (let i = 0; i < text.length; i += chunkSize) {
        chunks.push(text.slice(i, i + chunkSize))
    }
    return chunks
}
const embedTexts = async (texts) => {
  const response = await fetch("https://api.voyageai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.VOYAGE_AI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "voyage-2",
      input: texts
    })
  });

  const result = await response.json();

  return result.data.map(item => item.embedding);
};


export const uploadDocument = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" })

    const { originalname, path: filePath, mimetype } = req.file
    const userId = req.user.id

    try {
        let rawText = ""
        if (mimetype === 'application/pdf') {
            const dataBuffer = await fs.promises.readFile(filePath)
            const data = await pdfParse(dataBuffer)
            rawText = data.text
        } else {
            rawText = fs.readFileSync(filePath, 'utf-8')
        }

        if (!rawText) return res.status(400).json({ message: "Could not extract text from file" })

        const chunks = splitTextIntoChunks(rawText, 1000);
        const vectors = await embedTexts(chunks);

        const client = await db.connect()
        try {
            await client.query('BEGIN')
            const documentResult = await client.query(
                `INSERT INTO documents (user_id, filename, file_type,status, file_url) 
                 VALUES ($1, $2, $3, 'INDEXED', $4) RETURNING id`,
                [userId, originalname, mimetype, filePath]
            )
            const documentId = documentResult.rows[0].id

            for (let i = 0; i < chunks.length; i++) {
                await client.query(
                    'INSERT INTO document_chunks (document_id, content, embedding) VALUES ($1, $2, $3)',
                    [documentId, chunks[i], JSON.stringify(vectors[i])]
                );
            }
            // ------------------------------------------

            await client.query('COMMIT')
        } catch (err) {
            await client.query('ROLLBACK')
            throw err 
        } finally {
            client.release()
        }

        fs.unlinkSync(filePath)
        res.status(201).json({ message: "Document processed and indexed successfully" })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getDocuments = async (req, res) => {
    try {
        const docResults = await db.query('SELECT id, filename, file_type FROM documents')
        if(docResults.rows.length === 0) return res.status(404).json({ message: "No documents found" })
        
        res.status(200).json({ 
            message: "Documents retrieved successfully",
            data: docResults.rows 
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }
}
