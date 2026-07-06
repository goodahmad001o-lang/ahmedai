import "./globals.css";

export const metadata = {
  title: "AHMEDAI",
  description: "هوش مصنوعی فارسی AHMEDAI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  );
}
