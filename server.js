
را داخل فایل `server.js` گذاشته باشی، کد خراب می‌شود. این علامت‌ها فقط برای نمایش کد در چت هستند و نباید داخل فایل جاوااسکریپت باشند.

همچنین چون کلید API را منتشر کرده‌ای، بعداً آن را در OpenRouter عوض کن.

فایل `server.js` را کامل پاک کن و دقیقاً این کد را جایگزین کن (بدون هیچ خط اضافی):

:::writing{variant="standard" id="53482"}
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

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
                            content: req.body.message
                        }
                    ]
                })
            }
        );

        const data = await response.json();

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`AhmedAI Server Running On Port ${PORT}`);
});
:::

بعد:

1. روی **Commit changes** بزن.
2. ۱ تا ۲ دقیقه صبر کن.
3. دوباره لاگ Render را چک کن.

اگر باز هم خطا داد، متن جدید لاگ را بفرست.
