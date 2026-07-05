import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { messages } = await req.json();
    
    // فعلاً یک پاسخ تستی می‌فرستیم تا ساختار درست باشد
    const lastMessage = messages[messages.length - 1].content;

    return NextResponse.json({
      role: 'assistant',
      content: `احمد، من پیام شما را دریافت کردم: "${lastMessage}". در مرحله بعد، من را به API واقعی وصل می‌کنیم!`
    });
  } catch (error) {
    return NextResponse.json({ error: 'خطا در پردازش پیام' }, { status: 500 });
  }
}
