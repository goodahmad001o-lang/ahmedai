
/* =========================
   ELEMENTS
========================= */

const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");

const openPro = document.getElementById("openPro");

/* =========================
   FREE LIMIT SYSTEM
========================= */

let freeLimit = 10;
let used = 0;

function checkLimit(){
  if(used >= freeLimit){
    return false;
  }
  used++;
  return true;
}

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
   LOADING
========================= */

function addLoading(){
  const msg = document.createElement("div");
  msg.classList.add("bot");
  msg.textContent = "⏳ در حال فکر کردن...";
  messages.appendChild(msg);
  return msg;
}

/* =========================
   CALL BACKEND AI
========================= */

async function sendToAI(message){

  const res = await fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: message
    })
  });

  const data = await res.json();

  return data.reply;
}

/* =========================
   SEND MESSAGE
========================= */

async function sendMessage(){

  const text = input.value.trim();
  if(text === "") return;

  // ❌ LIMIT CHECK
  if(!checkLimit()){
    addMessage("💎 شما به محدودیت رایگان رسیدید. نسخه Pro به زودی فعال می‌شود.", "bot");
    return;
  }

  addMessage(text, "user");
  input.value = "";

  const loading = addLoading();

  const reply = await sendToAI(text);

  loading.remove();

  addMessage(reply, "bot");
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
   PRO PREVIEW (NO PAYMENT YET)
========================= */

if(openPro){
  openPro.addEventListener("click", () => {
    alert("💎 نسخه Pro در حال آماده‌سازی است\nفعلاً در لیست انتظار هستی!");
  });
}
