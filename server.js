const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // اضافه شده برای اطمینان از کارکرد در Render

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const API_KEY = process.env.OPENROUTER_API_KEY;

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        if (!API_KEY) {
            return res.status(500).json({ reply: "خطا: API Key تنظیم نشده است." });
        }

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://ahmedai-gqs8.onrender.com",
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
                            content: userMessage
                        }
                    ]
                })
            }
        );

        const data = await response.json();

// این خط باعث می‌شود تمام پاسخ دریافتی در لاگ‌های Render چاپ شود
console.log("Full API Response:", JSON.stringify(data));

if (data.choices && data.choices[0] && data.choices[0].message) {
    res.json({
        reply: data.choices[0].message.content
    });
} else {
    // اگر ساختار درست نبود، کل پاسخ را برای دیدن خطا در سایت نشان می‌دهد
    res.json({
        reply: "خطا در ساختار پاسخ: " + JSON.stringify(data)
    });
}
        

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({
            reply: "خطا در اتصال به هوش مصنوعی"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`AhmedAI Server Running On Port ${PORT}`);
});
