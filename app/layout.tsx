import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import GNB from "./components/GNB";
import Footer from "./components/Footer";
import FloatingQuickMenuWrapper from "./components/FloatingQuickMenuWrapper";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Y튜터 | YBM 강사 전용 플랫폼",
  description: "YBM 강사를 위한 스마트 교육 솔루션 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-slate-50 antialiased">
        <GNB />
        <FloatingQuickMenuWrapper />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
