alert("JS Loaded");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");

function addMessage(text, type) {
const div = document.createElement("div");
div.className = type;
div.innerText = text;

```
messages.appendChild(div);
messages.scrollTop = messages.scrollHeight;
```

}

async function sendMessage() {

```
const text = input.value.trim();

if (!text) return;

addMessage("شما: " + text, "user");

input.value = "";

try {

    addMessage("AhmedAI: در حال فکر کردن...", "ai");
    alert("در حال ارسال به سرور");
    const response = await fetch("/chat", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            message: text
        })
    });

    const data = await response.json();

    messages.lastChild.remove();

    addMessage("AhmedAI: " + data.reply, "ai");

} catch (error) {

    messages.lastChild.remove();

    addMessage("خطا در اتصال به سرور", "ai");

    console.log(error);
}
```

}

sendBtn.addEventListener("click", function() {
alert("دکمه کار می‌کند");
sendMessage();
});


input.addEventListener("keydown", function(e) {
if (e.key === "Enter") {
e.preventDefault();
sendMessage();
}
});
