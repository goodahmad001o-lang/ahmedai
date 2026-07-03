
// ===============================
// AhmedAI V3 - app.js (Part 1)
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
const themeSwitch = document.getElementById("themeSwitch");

// ===============================
// ساخت پیام
// ===============================

function addMessage(text, sender){

    const message=document.createElement("div");
    message.className="message "+sender;

    const avatar=document.createElement("div");
    avatar.className="avatar";
    avatar.textContent=(sender==="user")?"🧑":"🤖";

    const bubble=document.createElement("div");
    bubble.className="bubble";
    bubble.textContent=text;

    message.appendChild(avatar);
    message.appendChild(bubble);

    messages.appendChild(message);

    messages.scrollTop=messages.scrollHeight;
}

// ===============================
// ارسال پیام
// ===============================

async function sendMessage(){

    const text=input.value.trim();

    if(text==="") return;

    homeScreen.style.display="none";

    addMessage(text,"user");

    input.value="";

    typing.classList.remove("hidden");

    try{

        const response=await fetch("/chat",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                message:text
            })

        });

        const data=await response.json();

        typing.classList.add("hidden");

        addMessage(data.reply,"ai");

    }catch(err){

        typing.classList.add("hidden");

        addMessage("❌ خطا در ارتباط با سرور","ai");

    }

}

// ===============================
// رویدادها
// ===============================

sendBtn.addEventListener("click",sendMessage);

input.addEventListener("keydown",function(e){

    if(e.key==="Enter"){

        sendMessage();

    }

});// ===============================
// تنظیمات
// ===============================

settingsBtn.addEventListener("click",()=>{

    settingsModal.classList.remove("hidden");

});

closeSettings.addEventListener("click",()=>{

    settingsModal.classList.add("hidden");

});

// بستن تنظیمات با کلیک روی پس‌زمینه

settingsModal.addEventListener("click",(e)=>{

    if(e.target===settingsModal){

        settingsModal.classList.add("hidden");

    }

});

// ===============================
// درباره AhmedAI
// ===============================

aboutBtn.addEventListener("click",()=>{

    settingsModal.classList.add("hidden");

    aboutModal.classList.remove("hidden");

});

closeAbout.addEventListener("click",()=>{

    aboutModal.classList.add("hidden");

});

aboutModal.addEventListener("click",(e)=>{

    if(e.target===aboutModal){

        aboutModal.classList.add("hidden");

    }

});

// ===============================
// پاک کردن گفتگو
// ===============================

clearChat.addEventListener("click",()=>{

    messages.innerHTML="";

    homeScreen.style.display="flex";

    settingsModal.classList.add("hidden");

});

// ===============================
// دارک / لایت مود
// ===============================

function toggleTheme(){

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){

        localStorage.setItem("theme","light");

        themeBtn.textContent="☀️";

        themeSwitch.textContent="☀️ حالت روز";

    }else{

        localStorage.setItem("theme","dark");

        themeBtn.textContent="🌙";

        themeSwitch.textContent="🌙 حالت شب";

    }

}

themeBtn.addEventListener("click",toggleTheme);

themeSwitch.addEventListener("click",()=>{

    toggleTheme();

    settingsModal.classList.add("hidden");

});

// ===============================
// بارگذاری تنظیمات ذخیره شده
// ===============================

window.addEventListener("load",()=>{

    const savedTheme=localStorage.getItem("theme");

    if(savedTheme==="light"){

        document.body.classList.add("light");

        themeBtn.textContent="☀️";

        themeSwitch.textContent="☀️ حالت روز";

    }

});

// ===============================
// پایان فایل
// ===============================
