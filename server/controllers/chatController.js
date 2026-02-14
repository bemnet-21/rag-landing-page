import { StringOutputParser } from '@langchain/core/output_parsers'
import db from '../db/index.js'
import { VoyageEmbeddings } from "@langchain/community/embeddings/voyage"
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import dotenv from 'dotenv'

dotenv.config()

const embeddings = new VoyageEmbeddings({
    apiKey: process.env.VOYAGE_AI_API_KEY,
    inputType: "query",
    modelName: "voyage-3"
})

const chatModel = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-2.5-flash",
    temperature: 0.3,
})
console.log()
export const chat = async (req, res) => {
    const { message } = req.body
    if (!message) return res.status(400).json({ message: "Message is required" })


    try {
        const questionEmbedding = await embeddings.embedQuery(message)
        const vectorString = JSON.stringify(questionEmbedding)
        const client = await db.connect()
        const { rows } = await client.query(`SELECT content FROM document_chunks ORDER BY embedding <-> $1 LIMIT 3`, [vectorString])
        if (rows.length === 0) return res.status(404).json({ message: "No relevant documents found" })


        const context = rows.map(row => row.content).join("\n")

        const prompt = ChatPromptTemplate.fromMessages([
            ["system", `You are a helpful assistant. use the provided context to answer the user's question accurately. If the context does not contain the answer, say "I'm sorry, I don't have that information."
                Context: {context}`],
            ["human", "{message}"]
        ])

        const chain = prompt.pipe(chatModel).pipe(new StringOutputParser())

        const response = await chain.invoke({
            context,
            message
        })
        res.json({ answer: response })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }

}