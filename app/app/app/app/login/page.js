
"use client";

import { useState } from "react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="login-page">

      <div className="login-card">

        <h1 className="logo">
          AHMEDAI
        </h1>

        <p className="subtitle">
          هوش مصنوعی فارسی برای ایران، افغانستان و تاجیکستان
        </p>

        <form>

          {!isLogin && (
            <input
              type="text"
              placeholder="نام کامل"
            />
          )}

          <input
            type="email"
            placeholder="ایمیل"
          />

          <input
            type="password"
            placeholder="رمز عبور"
          />

          <button type="submit">
            {isLogin ? "ورود" : "ثبت نام"}
          </button>

        </form>

        <button
          className="switch-btn"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "حساب نداری؟ ثبت نام"
            : "قبلاً ثبت نام کردی؟ ورود"}
        </button>

      </div>

    </main>
  );
              }
