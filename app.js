/* ===== ELEMENTS ===== */

const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");

const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const closeSettings = document.getElementById("closeSettings");
const clearChat = document.getElementById("clearChat");
const aboutBtn = document.getElementById("aboutBtn");

/* ===== SEND MESSAGE ===== */

function addMessage(text, type){

  const msg = document.createElement("div");
  msg.classList.add(type);
  msg.textContent = text;

  messages.appendChild(msg);

  messages.scrollTop = messages.scrollHeight;
}

/* ===== MAIN SEND ===== */

function sendMessage(){

  const text = input.value.trim();

  if(text === "") return;

  // user message
  addMessage(text, "user");

  input.value = "";

  // bot reply (فعلاً موقت)
  setTimeout(() => {
    addMessage("🤖 در حال پردازش هستم...", "bot");
  }, 400);
}

/* ===== EVENTS ===== */

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {
  if(e.key === "Enter"){
    sendMessage();
  }
});

/* ===== SETTINGS ===== */

settingsBtn.addEventListener("click", () => {
  settingsModal.classList.remove("hidden");
});

closeSettings.addEventListener("click", () => {
  settingsModal.classList.add("hidden");
});

/* ===== CLEAR CHAT ===== */

clearChat.addEventListener("click", () => {

  messages.innerHTML = "";

  addMessage("👋 سلام! من AhmedAI هستم", "bot");

  settingsModal.classList.add("hidden");
});

/* ===== ABOUT ===== */

aboutBtn.addEventListener("click", () => {
  alert("AhmedAI V6\nساخته شده برای تبدیل شدن به یک محصول پول‌ساز 😎");
});

/* ===== CLOSE MODAL ===== */

settingsModal.addEventListener("click", (e) => {
  if(e.target === settingsModal){
    settingsModal.classList.add("hidden");
  }
});
