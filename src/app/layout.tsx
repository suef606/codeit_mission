// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";

/**
 * 나눔스퀘어 폰트 설정
 * Next.js의 localFont를 사용하여 로컬 폰트 파일 로드
 */
const nanumSquare = localFont({
  src: [
    {
      // Regular 폰트 설정
      path: "../../public/fonts/NanumSquareR.otf",
      weight: "400",
      style: "normal",
    },
    {
      // Bold 폰트 설정
      path: "../../public/fonts/NanumSquareB.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-nanum-square", // Tailwind CSS에서 사용할 변수명
});

/**
 * 메타데이터 설정
 * - title: 페이지 제목
 * - description: 사이트 설명
 * - icons: 파비콘 설정 (ico, png, svg)
 */
export const metadata: Metadata = {
  title: "Todo List",
  description: "할 일 목록을 관리하는 To Do 서비스",
  icons: {
    icon: "/favicon.ico", // 기본 파비콘 (자동 인식됨)
    shortcut: "/favicon.png", // 일부 브라우저에서 사용
    apple: "/favicon.png", // iOS 홈 화면 아이콘
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 파비콘 설정 */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        {/* 최신 브라우저 지원용 SVG (필수 아님) */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* iOS 홈 화면 아이콘 */}
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className={`${nanumSquare.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
