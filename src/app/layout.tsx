import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LifeCode AI | 데이터로 설계하는 당신의 내일",
  description: "사주 명리와 에니어그램 기반의 현대적 라이프 데이터 분석 도구입니다. 당신의 기질과 타이밍을 확인하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 구글 애드센스 전역 스크립트 (추후 클라이언트 ID 발급 시 교체) */}
        {/* 예시: src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" */}
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}