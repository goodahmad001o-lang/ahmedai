/* =========================
   ELEMENTS
========================= */

const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");

const menuBtn = document.getElementById("menuBtn");
const drawer = document.getElementById("drawer");
const closeDrawer = document.getElementById("closeDrawer");

const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const closeSettings = document.getElementById("closeSettings");

const clearChat = document.getElementById("clearChat");
const aboutBtn = document.getElementById("aboutBtn");
const openPro = document.getElementById("openPro");

const proModal = document.getElementById("proModal");
const closePro = document.getElementById("closePro");

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
   BOT RESPONSE (TEST MODE)
========================= */

function botReply(userText){

    setTimeout(() => {
        addMessage("🤖 در حال پردازش: " + userText, "bot");
    }, 500);

}

/* =========================
   SEND MESSAGE
========================= */

function sendMessage(){

    const text = input.value.trim();
    if(text === "") return;

    addMessage(text, "user");
    input.value = "";

    botReply(text);
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
   DRAWER CONTROL
========================= */

menuBtn.addEventListener("click", () => {
    drawer.classList.remove("hidden");
});

closeDrawer.addEventListener("click", () => {
    drawer.classList.add("hidden");
});

/* close drawer by clicking background */
drawer.addEventListener("click", (e) => {
    if(e.target === drawer){
        drawer.classList.add("hidden");
    }
});

/* =========================
   SETTINGS MODAL
========================= */

settingsBtn.addEventListener("click", () => {
    settingsModal.classList.remove("hidden");
});

closeSettings.addEventListener("click", () => {
    settingsModal.classList.add("hidden");
});

settingsModal.addEventListener("click", (e) => {
    if(e.target === settingsModal){
        settingsModal.classList.add("hidden");
    }
});

/* =========================
   PRO MODAL
========================= */

openPro.addEventListener("click", () => {
    proModal.classList.remove("hidden");
});

closePro.addEventListener("click", () => {
    proModal.classList.add("hidden");
});

proModal.addEventListener("click", (e) => {
    if(e.target === proModal){
        proModal.classList.add("hidden");
    }
});

/* =========================
   CLEAR CHAT
========================= */

clearChat.addEventListener("click", () => {

    messages.innerHTML = "";

    addMessage("👋 سلام! من AHMEDAI هستم", "bot");

    drawer.classList.add("hidden");
});
