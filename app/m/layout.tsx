"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  {
    href: "/m",
    label: "홈",
    icon: (active: boolean) => (
      <svg className={`w-6 h-6 ${active ? "text-[#1B3A6B]" : "text-slate-400"}`} fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: "/m/textbooks",
    label: "교재",
    icon: (active: boolean) => (
      <svg className={`w-6 h-6 ${active ? "text-[#1B3A6B]" : "text-slate-400"}`} fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    href: "/m/my-class",
    label: "마이클래스",
    icon: (active: boolean) => (
      <svg className={`w-6 h-6 ${active ? "text-[#1B3A6B]" : "text-slate-400"}`} fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: "/m/edutech",
    label: "에듀테크",
    icon: (active: boolean) => (
      <svg className={`w-6 h-6 ${active ? "text-[#1B3A6B]" : "text-slate-400"}`} fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    href: "/m/more",
    label: "더보기",
    icon: (active: boolean) => (
      <svg className={`w-6 h-6 ${active ? "text-[#1B3A6B]" : "text-slate-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
];

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 max-w-md mx-auto relative">
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-40 bg-[#1B3A6B] px-4 h-14 flex items-center justify-between shadow-lg">
        <Link href="/m" className="flex items-center gap-2">
          <div className="text-white font-black text-xl tracking-tighter">
            Y<span className="text-amber-400">튜</span>터
          </div>
          <span className="text-blue-300 text-xs font-medium">YBM 강사 전용</span>
        </Link>
        <Link href="/login" className="flex items-center gap-1 text-xs text-blue-200 hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          로그인
        </Link>
      </header>

      {/* 콘텐츠 */}
      <main className="pb-20">
        {children}
      </main>

      {/* 하단 탭바 */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-white border-t border-slate-200 shadow-lg">
        <div className="grid grid-cols-5">
          {TABS.map((tab) => {
            const active = pathname === tab.href || (tab.href !== "/m" && pathname.startsWith(tab.href));
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex flex-col items-center justify-center py-2 gap-0.5"
              >
                {tab.icon(active)}
                <span className={`text-[10px] font-semibold ${active ? "text-[#1B3A6B]" : "text-slate-400"}`}>
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
