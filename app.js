const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");
const typing = document.getElementById("typing");

function addMessage(text, sender) {

    const message = document.createElement("div");
    message.className = "message " + sender;

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = sender === "user" ? "🧑" : "🤖";

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;

    message.appendChild(avatar);
    message.appendChild(bubble);

    messages.appendChild(message);

    messages.scrollTop = messages.scrollHeight;
}

async function sendMessage() {

    const text = input.value.trim();

    if (text === "") return;

    addMessage(text, "user");

    input.value = "";

    typing.classList.remove("hidden");

    try {

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

        typing.classList.add("hidden");

        addMessage(data.reply, "ai");

    } catch (err) {

        typing.classList.add("hidden");

        addMessage("❌ خطا در ارتباط با سرور.", "ai");

    }

}

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", function(e) {

    if (e.key === "Enter") {

        sendMessage();

    }

});
