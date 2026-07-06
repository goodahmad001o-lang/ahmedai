export default function Home() {
  return (
    <main
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#0f172a,#111827,#1e293b)",
        color: "#fff",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "700px",
          padding: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "60px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          AHMEDAI
        </h1>

        <p
          style={{
            fontSize: "22px",
            lineHeight: "2",
            color: "#cbd5e1",
            marginBottom: "40px",
          }}
        >
          هوش مصنوعی فارسی برای ایران، افغانستان و تاجیکستان.
          <br />
          پاسخ هوشمند، سریع و دقیق با رابط کاربری مدرن.
        </p>

        <button
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "16px 40px",
            fontSize: "20px",
            borderRadius: "12px",
            transition: "0.3s",
          }}
        >
          شروع رایگان
        </button>
      </div>
    </main>
  );
}
