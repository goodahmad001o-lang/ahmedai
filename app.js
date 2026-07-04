
/* ===== AhmedAI V5 APP.JS ===== */

const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");

const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const closeSettings = document.getElementById("closeSettings");
const clearChat = document.getElementById("clearChat");
const aboutBtn = document.getElementById("aboutBtn");

/* =========================
   ارسال پیام
========================= */

function addMessage(text, type){
  const msg = document.createElement("div");
  msg.classList.add(type);
  msg.textContent = text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

function sendMessage(){

  const text = input.value.trim();
  if(text === "") return;

  addMessage(text, "user");

  input.value = "";

  // جواب ساده موقت (بعداً AI وصل می‌کنیم)
  setTimeout(() => {
    addMessage("🤖 در حال توسعه هوش مصنوعی هستم...", "bot");
  }, 500);
}

/* =========================
   دکمه ارسال
========================= */

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {
  if(e.key === "Enter"){
    sendMessage();
  }
});

/* =========================
   تنظیمات (حل مشکل اصلی تو)
========================= */

settingsBtn.addEventListener("click", () => {
  settingsModal.classList.remove("hidden");
});

closeSettings.addEventListener("click", () => {
  settingsModal.classList.add("hidden");
});

/* =========================
   پاک کردن چت
========================= */

clearChat.addEventListener("click", () => {
  messages.innerHTML = "";

  addMessage("سلام 👋 من AhmedAI هستم", "bot");

  settingsModal.classList.add("hidden");
});

/* =========================
   درباره
========================= */

aboutBtn.addEventListener("click", () => {
  alert("AhmedAI V5\nساخته شده توسط تو 😎🚀");
});

/* =========================
   بستن مودال با کلیک بیرون
========================= */

settingsModal.addEventListener("click", (e) => {
  if(e.target === settingsModal){
    settingsModal.classList.add("hidden");
  }
});
