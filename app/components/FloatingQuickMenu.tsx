"use client";
import { useState } from "react";
import Link from "next/link";

function BookOpenIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2V3z" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7V3z" />
    </svg>
  );
}

function BookRequestIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      <path d="M12 9v6m-3-3h6" />
    </svg>
  );
}

function ChatDotsIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      <circle cx="8.5" cy="10" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="12"  cy="10" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="10" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BooksShelfIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 5h4v15H2z" />
      <path d="M8 3h5v17H8z" />
      <path d="M15 5h7v15h-7z" />
    </svg>
  );
}

const TOOLS = [
  { id: "school-purchase", label: "학교 구매 안내", href: "#",                isExt: true,  Icon: BookOpenIcon },
  { id: "book-request",    label: "견본도서 신청",  href: "#",                isExt: true,  Icon: BookRequestIcon },
  { id: "inquiry",         label: "문의 접수",      href: "/support/inquiry", isExt: false, Icon: ChatDotsIcon },
  { id: "teaching-room",   label: "교사 티칭룸",    href: "#",                isExt: true,  Icon: BooksShelfIcon },
];

export default function FloatingQuickMenu() {
  const [open, setOpen] = useState(true);

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center">
      {/* 접기/펼치기 탭 */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-5 h-14 bg-white border border-slate-200 border-r-0 rounded-l-xl shadow-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
      >
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-0" : "rotate-180"}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* 메인 카드 */}
      <div
        className={`bg-white rounded-l-2xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] ring-1 ring-slate-200 overflow-hidden transition-all duration-200 ${
          open ? "w-[172px] opacity-100" : "w-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* 헤더 */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-100 bg-slate-50">
          <svg className="w-3 h-3 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 10h16M4 14h10" />
          </svg>
          <span className="text-[11px] font-black text-slate-700 whitespace-nowrap">
            빠른 서비스 <span className="font-medium text-slate-400">(퀵메뉴)</span>
          </span>
        </div>

        {/* 메뉴 아이템 */}
        <ul className="divide-y divide-slate-100">
          {TOOLS.map((tool) => {
            const rowCls = "w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-blue-50/60 transition-colors group text-left";
            const Icon = tool.Icon;
            const inner = (
              <>
                <div className="w-8 h-8 shrink-0 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors shadow-sm">
                  <Icon />
                </div>
                <span className="flex-1 text-[11.5px] font-semibold text-slate-700 group-hover:text-blue-700 whitespace-nowrap leading-tight">
                  {tool.label}
                </span>
              </>
            );

            if (tool.isExt) {
              return (
                <li key={tool.id}>
                  <a href={tool.href} target="_blank" rel="noopener noreferrer" className={rowCls}>{inner}</a>
                </li>
              );
            }
            return (
              <li key={tool.id}>
                <Link href={tool.href} className={rowCls}>{inner}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
