document.addEventListener("DOMContentLoaded", () => {

const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");
const typing = document.getElementById("typing");

const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const closeSettings = document.getElementById("closeSettings");
const clearChat = document.getElementById("clearChat");
const aboutBtn = document.getElementById("aboutBtn");

const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");

function addMessage(text, sender){

if(!messages) return;

const div = document.createElement("div");
div.className = "msg " + sender;
div.textContent = text;

messages.appendChild(div);
messages.scrollTop = messages.scrollHeight;

}

async function sendMessage(){

if(!input) return;

const text = input.value.trim();
if(!text) return;

addMessage(text,"user");
input.value = "";

typing?.classList.remove("hidden");

try{

const res = await fetch("/chat",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({message:text})
});

const data = await res.json();

typing?.classList.add("hidden");
addMessage(data.reply,"ai");

}catch(err){

typing?.classList.add("hidden");
addMessage("خطا در ارتباط","ai");

}

}

/* EVENTS SAFE */
sendBtn?.addEventListener("click", sendMessage);

input?.addEventListener("keydown",(e)=>{
if(e.key==="Enter") sendMessage();
});

settingsBtn?.addEventListener("click",()=>{
settingsModal?.classList.remove("hidden");
});

closeSettings?.addEventListener("click",()=>{
settingsModal?.classList.add("hidden");
});

clearChat?.addEventListener("click",()=>{
messages.innerHTML = "";
settingsModal?.classList.add("hidden");
});

aboutBtn?.addEventListener("click",()=>{
alert("AhmedAI V4.1 - Stable Version");
});

menuBtn?.addEventListener("click",()=>{
sidebar?.classList.toggle("hidden");
});

/* ICONS SAFE */
try{
if(window.lucide){
lucide.createIcons();
}
}catch(e){
console.log("icons error ignored");
}

});
