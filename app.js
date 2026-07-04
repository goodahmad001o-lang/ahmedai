/* =========================
   ELEMENTS
========================= */

const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");

const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const closeSettings = document.getElementById("closeSettings");
const clearChat = document.getElementById("clearChat");
const aboutBtn = document.getElementById("aboutBtn");

/* =========================
   ADD MESSAGE
========================= */

function addMessage(text, type){

    const msg = document.createElement("div");
    msg.classList.add(type);
    msg.textContent = text;

    messages.appendChild(msg);

    messages.scrollTop = messages.scrollHeight;
}

/* =========================
   TYPING EFFECT (BOT)
========================= */

function typeMessage(text){

    const msg = document.createElement("div");
    msg.classList.add("bot");

    messages.appendChild(msg);

    let i = 0;

    const interval = setInterval(() => {

        msg.textContent += text[i];
        i++;

        messages.scrollTop = messages.scrollHeight;

        if(i >= text.length){
            clearInterval(interval);
        }

    }, 20);
}

/* =========================
   SEND MESSAGE
========================= */

function sendMessage(){

    const text = input.value.trim();

    if(text === "") return;

    // user message
    addMessage(text, "user");

    input.value = "";

    // bot fake response (فعلاً)
    setTimeout(() => {

        typeMessage("🤖 در حال پردازش درخواست شما هستم...");

    }, 400);
}

/* =========================
   EVENTS
========================= */

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {

    if(e.key === "Enter"){
        sendMessage();
    }

});

/* =========================
   SETTINGS
========================= */

settingsBtn.addEventListener("click", () => {

    settingsModal.classList.remove("hidden");

});

closeSettings.addEventListener("click", () => {

    settingsModal.classList.add("hidden");

});

/* =========================
   CLEAR CHAT
========================= */

clearChat.addEventListener("click", () => {

    messages.innerHTML = "";

    addMessage("👋 سلام! من AHMEDAI هستم", "bot");

    settingsModal.classList.add("hidden");

});

/* =========================
   ABOUT
========================= */

aboutBtn.addEventListener("click", () => {

    alert("AHMEDAI V7\nAI Assistant Product 🚀");

});

/* =========================
   CLOSE MODAL OUTSIDE CLICK
========================= */

settingsModal.addEventListener("click", (e) => {

    if(e.target === settingsModal){
        settingsModal.classList.add("hidden");
    }

});
