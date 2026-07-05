import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col items-center justify-center px-4">
      {/* بخش معرفی اصلی (Hero Section) */}
      <main className="text-center max-w-3xl">
        <div className="mb-6 inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
          نسخه جدید AhmedAI منتشر شد
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AhmedAI
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
          هوش مصنوعی فوق پیشرفته برای حل مسائل پیچیده، برنامه‌نویسی و تولید محتوا. <br />
          با AhmedAI، مرزهای توانایی خود را جابجا کنید.
        </p>

        {/* دکمه ورود که گفتی */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/login" 
            className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20"
          >
            همین الان وارد شو
          </Link>
          <button className="px-10 py-4 border border-slate-200 dark:border-slate-800 rounded-xl font-medium text-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
            مشاهده ویژگی‌ها
          </button>
        </div>
      </main>

      {/* بخش ویژگی‌ها */}
      <section className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {[
          { title: "هوشمند", desc: "استفاده از قدرتمندترین مدل‌های زبانی" },
          { title: "سریع", desc: "پاسخ‌های آنی و پردازش در لحظه" },
          { title: "امن", desc: "حفاظت کامل از داده‌های کاربران" }
        ].map((item, i) => (
          <div key={i} className="p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-center">
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-slate-500 dark:text-slate-400">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
