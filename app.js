document.getElementById("sendBtn").onclick = async function () {
    const userInput = document.getElementById("userInput");
    const messagesDiv = document.getElementById("messages");
    const message = userInput.value.trim();

    if (!message) return;

    // ۱. نمایش پیام کاربر در صفحه
    messagesDiv.innerHTML += `<div class="user">${message}</div>`;
    userInput.value = ""; // پاک کردن باکس ورودی
    
    // اسکرول به پایین
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    try {
        // ۲. ارسال پیام به بک‌اِند (مسیر /chat مطابق با سرور)
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        });

        if (!response.ok) {
            throw new Error("خطا در ارتباط با سرور");
        }

        const data = await response.json();

        // ۳. نمایش پاسخ هوش مصنوعی
        messagesDiv.innerHTML += `<div class="ai">${data.reply}</div>`;
        
    } catch (error) {
        console.error("Error:", error);
        messagesDiv.innerHTML += `<div class="ai" style="color: red;">خطا: نمی‌توان به سرور متصل شد.</div>`;
    }

    // اسکرول به پایین بعد از دریافت پاسخ
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

// اجازه ارسال با دکمه Enter
document.getElementById("userInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        document.getElementById("sendBtn").click();
    }
});
