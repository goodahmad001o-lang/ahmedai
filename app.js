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
// تنظیمات

const settingsBtn = document.getElementById("settingsBtn");

const settingsModal = document.getElementById("settingsModal");

const closeSettings = document.getElementById("closeSettings");

const clearChat = document.getElementById("clearChat");

const aboutBtn = document.getElementById("aboutBtn");

settingsBtn.onclick = () => {

settingsModal.classList.remove("hidden");

};

closeSettings.onclick = () => {

settingsModal.classList.add("hidden");

};

clearChat.onclick = () => {

messages.innerHTML = `

<div class="message ai">

<div class="avatar">🤖</div>

<div class="bubble">

سلام!

من AhmedAI هستم 😊

</div>

</div>

`;

settingsModal.classList.add("hidden");

};

aboutBtn.onclick = () => {

alert("AhmedAI\nنسخه 2.1\nساخته شده توسط Ahmad ❤️");

};
