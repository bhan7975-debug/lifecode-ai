import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        {/* Next.js 속성 주입을 회피하기 위한 네이티브 HTML 스크립트 태그 적용 */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}