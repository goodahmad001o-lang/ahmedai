const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;

app.post("/chat", async (req, res) => {
  try {

    const userMessage = req.body.message;

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/@cf/openai/gpt-oss-120b`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are AhmedAI. Always answer in Persian. Be helpful and concise."
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

    console.log("CLOUDFLARE RESPONSE:", JSON.stringify(data, null, 2));

    // ✅ FIXED PARSING (مهم‌ترین بخش)
    let reply =
      data?.result?.response ||
      data?.result?.output ||
      data?.result?.text ||
      data?.result?.message ||
      "پاسخی دریافت نشد.";

    res.json({ reply });

  } catch (err) {
    console.error("ERROR:", err);

    res.json({
      reply: "خطا در اتصال به هوش مصنوعی"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("AhmedAI Running On Port " + PORT);
});
