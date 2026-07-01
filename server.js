const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;

app.post("/chat", async (req, res) => {
    try {
        const response = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct`,
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
                            content: "You are AhmedAI. Always answer in Persian."
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

        console.log(JSON.stringify(data, null, 2));

        if (data.success && data.result && data.result.response) {
            res.json({
                reply: data.result.response
            });
        } else {
            res.json({
                reply: "پاسخی دریافت نشد."
            });
        }

    } catch (err) {
        console.error(err);
        res.json({
            reply: "خطا در اتصال به Cloudflare AI"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("AhmedAI Running On Port " + PORT);
});
