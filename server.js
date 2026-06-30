const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const API_KEY = process.env.OPENROUTER_API_KEY;

app.post("/chat", async (req, res) => {
    const message = req.body.message;

    if (!message) {
        return res.status(400).json({ reply: "پیام خالی است." });
    }

    if (!API_KEY) {
        console.error("خطا: API_KEY در Environment Variables تنظیم نشده است!");
        return res.json({ reply: "خطا: تنظیمات سرور نامعتبر است." });
    }

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://ahmedai-gqs8.onrender.com",
                "X-Title": "AhmedAI"
            },
            body: JSON.stringify({
                model: "meta-llama/llama-3-8b-instruct:free",
                messages: [
                    { role: "system", content: "Your name is AhmedAI. Answer in Persian." },
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();

        // بررسی اینکه آیا پاسخ از OpenRouter درست دریافت شده است
        if (data.choices && data.choices[0] && data.choices[0].message) {
            res.json({
                reply: data.choices[0].message.content
            });
        } else {
            // اگر API خطایی داده باشد، آن را در لاگ Render چاپ می‌کنیم
            console.error("API Error Response:", JSON.stringify(data));
            res.json({
                reply: "متاسفم، پاسخی از هوش مصنوعی دریافت نشد. لطفاً دوباره تلاش کنید."
            });
        }

    } catch (error) {
        console.error("Server Error:", error);
        res.json({
            reply: "خطا در اتصال به سرور هوش مصنوعی."
        });
    }
});

app.listen(PORT, () => {
    console.log(`AhmedAI Server Running On Port ${PORT}`);
});
