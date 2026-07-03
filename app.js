
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

const msg = document.createElement("div");
msg.className = sender;

msg.innerHTML = `
<div class="bubble">${text}</div>
`;

messages.appendChild(msg);
messages.scrollTop = messages.scrollHeight;

}

async function sendMessage(){

const text = input.value.trim();
if(!text) return;

addMessage(text,"user");
input.value = "";
typing.classList.remove("hidden");

try{

const res = await fetch("/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({message:text})
});

const data = await res.json();

typing.classList.add("hidden");
addMessage(data.reply,"ai");

}catch(err){

typing.classList.add("hidden");
addMessage("خطا در اتصال","ai");

}

}

/* events */
sendBtn.onclick = sendMessage;

input.addEventListener("keydown",(e)=>{
if(e.key==="Enter") sendMessage();
});

/* settings */
settingsBtn.onclick = ()=>settingsModal.classList.remove("hidden");
closeSettings.onclick = ()=>settingsModal.classList.add("hidden");

clearChat.onclick = ()=>{
messages.innerHTML="";
settingsModal.classList.add("hidden");
};

aboutBtn.onclick = ()=>{
alert("AhmedAI V4 - Mobile First");
};

/* sidebar */
menuBtn.onclick = ()=>{
sidebar.classList.toggle("hidden");
};

/* icons */
window.onload = ()=>lucide.createIcons();
