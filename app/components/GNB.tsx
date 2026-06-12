"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../lib/useAuth";

const NAV = [
  {
    id: "textbooks",
    label: "교재",
    href: "/textbooks",
    icon: (
      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    menu: [],
  },
  {
    id: "my-class",
    label: "마이클래스",
    href: "/my-class",
    icon: (
      <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    menu: [],
  },
  {
    id: "roadmap",
    label: "학습로드맵",
    href: "/roadmap",
    icon: (
      <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    menu: [],
  },
  {
    id: "edutech",
    label: "에듀테크",
    href: "/edutech",
    icon: (
      <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    menu: [
      { label: "클래스게임",    href: "https://www.ybmcloud.com/twowaygames/content?siteType=E" },
      { label: "어휘출제마법사", href: "/edutech/vocab-wizard" },
      { label: "깜짝퀴즈",      href: "https://school.ybmsmartschool.com/quiz/quiz_list?grd_cd=301002&sso_tag=4e89ae318b9ea3a9b6ab376912995b03" },
      { label: "AI평가",        href: "/edutech/ai-eval" },
      { label: "커넥팅북",      href: "https://www.ybmcloud.com/connecting/content?siteType=E" },
      { label: "AI 자료 생성",  href: "/edutech/ai-material", isNew: true },
    ],
  },
];

const SUPPORT_MENU = [
  { label: "공지사항",  href: "/support/notices", icon: "📢" },
  { label: "이벤트",   href: "/support/events",  icon: "🎁" },
  { label: "이슈톡",   href: "__issuetalk__",    icon: "💬" },
  { label: "FAQ",      href: "/support/faq",     icon: "❓" },
  { label: "마이페이지", href: "/my-page",        icon: "👤" },
];

export default function GNB() {
  const [activeMenu,     setActiveMenu]     = useState<string | null>(null);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [issuetalkPopup, setIssuetalkPopup] = useState(false);
  const [ybmbooksPopup,  setYbmbooksPopup]  = useState(false);
  const [query,          setQuery]          = useState("");
  const [filterOpen,     setFilterOpen]     = useState(false);
  const [levelFilter,    setLevelFilter]    = useState<string[]>([]);
  const pathname = usePathname();
  const router   = useRouter();
  const { isLoggedIn, ready, logout } = useAuth();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const toggleLevel = (lv: string) => {
    if (lv === "__clear__") { setLevelFilter([]); return; }
    setLevelFilter((prev) => prev.includes(lv) ? prev.filter((x) => x !== lv) : [...prev, lv]);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (levelFilter.length > 0) params.set("levels", levelFilter.join(","));
    router.push(`/textbooks${params.toString() ? "?" + params.toString() : ""}`);
    setFilterOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 shadow-md">

      {/* ── 1행: 로고 + 통합검색창 + 유틸리티 (흰색 배경) ── */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 pt-[16px] pb-3">

            {/* 로고 */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="font-black text-xl tracking-tighter select-none text-slate-800">
                Y<span className="text-amber-500">튜</span>터
              </div>
            </Link>

            {/* 통합 검색창 */}
            <div className="flex-1 hidden md:flex items-center justify-end pr-8 relative">
              <div className="flex items-center bg-white border-2 border-slate-700 rounded-xl overflow-hidden w-full max-w-xl shadow-sm">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="교재명 통합검색"
                  className="flex-1 text-sm text-slate-700 px-4 py-2.5 focus:outline-none"
                />
                {/* 필터 버튼 */}
                <button
                  onClick={() => setFilterOpen((v) => !v)}
                  className={`flex items-center gap-1 px-3 py-2.5 border-l border-slate-200 text-sm transition-colors shrink-0 ${
                    filterOpen || levelFilter.length > 0
                      ? "bg-slate-100 text-slate-800"
                      : "text-slate-400 hover:text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                  </svg>
                  {levelFilter.length > 0 && (
                    <span className="w-4 h-4 bg-slate-800 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                      {levelFilter.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={handleSearch}
                  className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2.5 text-sm font-bold transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  검색
                </button>
              </div>

              {/* 필터 드롭다운 */}
              {filterOpen && (
                <div className="absolute right-8 top-full mt-2 w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-xl p-4 z-50">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-semibold text-slate-700 shrink-0">이용대상</span>
                    <div className="flex gap-2">
                      {["초등", "중등", "고등"].map((lv) => (
                        <button
                          key={lv}
                          onClick={() => toggleLevel(lv)}
                          className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                            levelFilter.includes(lv)
                              ? "bg-slate-800 border-slate-800 text-white"
                              : "bg-white border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-800"
                          }`}
                        >
                          {lv}
                        </button>
                      ))}
                    </div>
                    <div className="ml-auto flex gap-2">
                      <button
                        onClick={() => toggleLevel("__clear__")}
                        className="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-700 border border-slate-200 rounded-xl"
                      >
                        초기화
                      </button>
                      <button
                        onClick={handleSearch}
                        className="px-4 py-1.5 text-sm font-semibold bg-slate-800 hover:bg-slate-900 text-white rounded-xl"
                      >
                        적용
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 유틸리티 링크 */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <a
                href="https://miracle03945-eng.github.io/booksam-v3/"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-800 transition-colors"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                YBM북스 참고서
              </a>
              <span className="w-px h-3 bg-slate-200" />
              {ready && isLoggedIn ? (
                <button
                  onClick={() => { logout(); router.push("/"); }}
                  className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  로그아웃
                </button>
              ) : ready ? (
                <Link href="/login" className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-800 transition-colors">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  로그인
                </Link>
              ) : (
                <span className="w-10 h-3 bg-slate-100 rounded animate-pulse" />
              )}
              <span className="w-px h-3 bg-slate-200" />
              {/* 고객센터 드롭다운 */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-800 transition-colors">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  고객센터
                  <svg className="w-2.5 h-2.5 transition-transform duration-150 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 top-full pt-2 hidden group-hover:block z-50">
                  <div className="w-40 bg-white rounded-xl shadow-xl border border-slate-100 py-2">
                    {SUPPORT_MENU.map((item) =>
                      item.href === "__issuetalk__" ? (
                        <button
                          key={item.href}
                          onClick={() => setIssuetalkPopup(true)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left"
                        >
                          <span>{item.icon}</span>{item.label}
                        </button>
                      ) : (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                          <span>{item.icon}</span>{item.label}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 모바일 햄버거 */}
            <button
              className="md:hidden ml-auto p-2 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-100"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── 2행: 메인 내비게이션 (네이비 배경으로 구분) ── */}
      <div className="bg-white border-b border-slate-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center h-[57px]">
            {NAV.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setActiveMenu(item.id)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 px-7 py-2.5 rounded-lg text-base font-semibold transition-all duration-150 ${
                    isActive(item.href)
                      ? "text-slate-900 bg-slate-100"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {item.icon}
                  {item.label}
                  {item.menu.length > 0 && (
                    <svg className="w-3 h-3 ml-0.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {item.menu.length > 0 && activeMenu === item.id && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                    {item.menu.map((child: { label: string; href: string; isNew?: boolean; isPaid?: boolean }) => {
                      const isExt = child.href.startsWith("http");
                      const cls = "flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors";
                      const badges = (
                        <div className="flex gap-1">
                          {child.isNew && <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold leading-none">NEW</span>}
                          {child.isPaid && <span className="text-[10px] bg-violet-500 text-white px-1.5 py-0.5 rounded-full font-bold leading-none">유</span>}
                        </div>
                      );
                      return isExt ? (
                        <a key={child.href} href={child.href} target="_blank" rel="noopener noreferrer" className={cls}>
                          <span>{child.label}</span>{badges}
                        </a>
                      ) : (
                        <Link key={child.href} href={child.href} className={cls}>
                          <span>{child.label}</span>{badges}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* ── 모바일 메뉴 ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
          {/* 모바일 검색 */}
          <div className="flex items-center bg-white border-2 border-slate-700 rounded-xl overflow-hidden mb-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { handleSearch(); setMobileOpen(false); }}}
              placeholder="교재 통합검색"
              className="flex-1 text-sm text-slate-700 px-4 py-2.5 bg-transparent focus:outline-none"
            />
            <button onClick={() => { handleSearch(); setMobileOpen(false); }} className="px-3 py-2.5 text-slate-700 hover:text-slate-900">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          {NAV.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-800"
              onClick={() => setMobileOpen(false)}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <div className="border-t border-slate-200 pt-2 mt-2 space-y-1">
            {isLoggedIn ? (
              <button
                onClick={() => { logout(); router.push("/"); setMobileOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-800 text-left"
              >
                로그아웃
              </button>
            ) : (
              <Link href="/login" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-800" onClick={() => setMobileOpen(false)}>
                로그인
              </Link>
            )}
            {SUPPORT_MENU.map((item) =>
              item.href === "__issuetalk__" ? (
                <button key="issuetalk" onClick={() => { setMobileOpen(false); setIssuetalkPopup(true); }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-800 text-left">
                  <span>{item.icon}</span>{item.label}
                </button>
              ) : (
                <Link key={item.href} href={item.href}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                  onClick={() => setMobileOpen(false)}>
                  <span>{item.icon}</span>{item.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}

      {/* ── YBM북스 팝업 ── */}
      {ybmbooksPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setYbmbooksPopup(false)} />
          <div className="relative z-10 max-w-5xl w-full">
            <button onClick={() => setYbmbooksPopup(false)}
              className="absolute -top-4 -right-4 z-10 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src="/images/ybmbooks-preview.png" alt="YBM북스 초중고 화면" className="w-full rounded-2xl shadow-2xl" />
            <div className="mt-4 flex justify-center">
              <a href="https://miracle03945-eng.github.io/booksam-v3/" target="_blank" rel="noopener noreferrer"
                onClick={() => setYbmbooksPopup(false)}
                className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg transition-colors">
                YBM북스 초중고 바로가기
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── 이슈톡 팝업 ── */}
      {issuetalkPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIssuetalkPopup(false)} />
          <div className="relative z-10 max-w-5xl w-full">
            <button onClick={() => setIssuetalkPopup(false)}
              className="absolute -top-4 -right-4 z-10 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src="/images/issue-talk-preview.png" alt="이슈톡 화면" className="w-full rounded-2xl shadow-2xl" />
            <div className="mt-4 flex justify-center">
              <a href="https://www.ybmsmartschool.com/?sso_tag=49594ef7b1bd86898b8fb2bc4cc66b56"
                target="_blank" rel="noopener noreferrer" onClick={() => setIssuetalkPopup(false)}
                className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-lg transition-colors">
                이슈톡 바로가기
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
