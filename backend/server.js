require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { GoogleGenAI } = require("@google/genai");

const app = express();

const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Gemini setup
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// Test route
app.get("/", (req, res) => {
    res.send("Ask Gemini Backend is running");
});

// Ask Gemini
app.post("/ask", async (req, res) => {

    const question = req.body.question;

    console.log("Question received:", question);

    try {

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Answer the following question briefly and clearly keep
            the answer between 5 and 7 sentences.
            use simple langugae and don't use any other sign .
            Question:${question}`
        });

        console.log("Gemini response:", response.text);

        res.json({
            answer: response.text
        });

    } catch (error) {

        console.error("Gemini API error:", error);

        res.status(500).json({
            error: "Something went wrong while asking Gemini"
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});