const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// API Key خودت از OpenRouter
const API_KEY = "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";

app.post("/chat", async (req, res) => {
    try {

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost",
                    "X-Title": "AhmedAI"
                },

                body: JSON.stringify({
                    model: "mistralai/mistral-7b-instruct",

                    messages: [
                        {
                            role: "system",
                            content: "Your name is AhmedAI. Answer in Persian."
                        },
                        {
                            role: "user",
                            content: req.body.message
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        console.log(data); // برای دیباگ

        res.json({
            reply: data.choices?.[0]?.message?.content || "پاسخی دریافت نشد"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            reply: "خطا در اتصال به OpenRouter"
        });
    }
});

app.listen(3000, () => {
    console.log("AhmedAI Server Running On Port 3000");
});
