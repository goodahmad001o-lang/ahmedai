// ===============================
// AhmedAI V4 - app.js
// ===============================

const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");
const typing = document.getElementById("typing");

const homeScreen = document.getElementById("homeScreen");

const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const closeSettings = document.getElementById("closeSettings");

const clearChat = document.getElementById("clearChat");

const aboutBtn = document.getElementById("aboutBtn");
const aboutModal = document.getElementById("aboutModal");
const closeAbout = document.getElementById("closeAbout");

const themeBtn = document.getElementById("themeBtn");

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

// ===============================
// ساخت پیام
// ===============================

function addMessage(text, sender){

    const msg = document.createElement("div");
    msg.className = "message " + sender;

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = sender === "user" ? "U" : "AI";

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;

    msg.appendChild(avatar);
    msg.appendChild(bubble);

    messages.appendChild(msg);

    messages.scrollTop = messages.scrollHeight;
}

// ===============================
// ارسال پیام
// ===============================

async function sendMessage(){

    const text = input.value.trim();

    if(text === "") return;

    homeScreen.style.display = "none";

    addMessage(text, "user");

    input.value = "";

    typing.classList.remove("hidden");

    try{

        const res = await fetch("/chat",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                message:text
            })

        });

        const data = await res.json();

        typing.classList.add("hidden");

        addMessage(data.reply, "ai");

    }catch(err){

        typing.classList.add("hidden");

        addMessage("❌ خطا در ارتباط با سرور", "ai");

    }
}

// ===============================
// ارسال پیام با دکمه و Enter
// ===============================

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e)=>{

    if(e.key === "Enter") sendMessage();

});

// ===============================
// تنظیمات
// ===============================

settingsBtn.onclick = ()=>{

    settingsModal.classList.remove("hidden");

};

closeSettings.onclick = ()=>{

    settingsModal.classList.add("hidden");

};

// ===============================
// سایدبار
// ===============================

menuBtn.onclick = ()=>{

    sidebar.classList.toggle("hidden");

};

// ===============================
// درباره
// ===============================

aboutBtn.onclick = ()=>{

    aboutModal.classList.remove("hidden");

};

closeAbout.onclick = ()=>{

    aboutModal.classList.add("hidden");

};

// ===============================
// پاک کردن چت
// ===============================

clearChat.onclick = ()=>{

    messages.innerHTML = "";

    homeScreen.style.display = "flex";

    settingsModal.classList.add("hidden");

};

// ===============================
// دارک مود ساده
// ===============================

themeBtn.onclick = ()=>{

    document.body.classList.toggle("light");

};

// ===============================
// Lucide Icons
// ===============================

window.onload = ()=>{

    lucide.createIcons();

};
