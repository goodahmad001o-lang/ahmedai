const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// نمایش فایل‌های سایت
app.use(express.static(__dirname));

// API Key خودت از OpenRouter
const API_KEY = "API_KEY_HERE";

app.post("/chat", async (req, res) => {
try {

```
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

    console.log(data);

    res.json({
        reply: data.choices?.[0]?.message?.content || "پاسخی دریافت نشد"
    });

} catch (error) {

    console.log(error);

    res.status(500).json({
        reply: "خطا در اتصال به OpenRouter"
    });
}
```

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(`AhmedAI Server Running On Port ${PORT}`);
});
