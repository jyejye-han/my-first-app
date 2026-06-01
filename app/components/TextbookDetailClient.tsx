"use client";
import Link from "next/link";
import { useState } from "react";

type Book = {
  id: string;
  title: string;
  author: string;
  levelGroup: string;
  category: string;
  emoji: string;
  image?: string;
  publishDate: string;
  description: string;
  isbn?: string;
  pages?: number;
  toc?: string[];
  isNew?: boolean;
};

const MATERIALS = [
  { id: "vocab",     label: "어휘리스트",  icon: "📝", type: "PDF",  color: "text-rose-500",    bg: "bg-rose-50",    border: "border-rose-100" },
  { id: "ppt",       label: "강의용 PPT",  icon: "📊", type: "PPT",  color: "text-orange-500",  bg: "bg-orange-50",  border: "border-orange-100" },
  { id: "worksheet", label: "워크시트",    icon: "📋", type: "PDF",  color: "text-green-600",   bg: "bg-green-50",   border: "border-green-100" },
  { id: "text",      label: "본문파일",    icon: "📄", type: "PDF",  color: "text-blue-600",    bg: "bg-blue-50",    border: "border-blue-100" },
  { id: "audio",     label: "듣기파일",    icon: "🎧", type: "MP3",  color: "text-purple-600",  bg: "bg-purple-50",  border: "border-purple-100" },
];

function renderDescription(text: string) {
  return text.split('\n').map((line, i) => {
    if (/^\[.+\]$/.test(line.trim())) {
      return <p key={i} className="font-bold text-slate-800 mt-4 mb-1 text-sm">{line.trim()}</p>;
    }
    if (line.startsWith('- ')) {
      return <p key={i} className="text-sm text-slate-600 leading-relaxed pl-3">• {line.slice(2)}</p>;
    }
    if (line.startsWith('* ')) {
      return <p key={i} className="text-sm font-semibold text-slate-700 mt-2">{line.slice(2)}</p>;
    }
    if (line.startsWith(': ')) {
      return <p key={i} className="text-sm text-slate-500 leading-relaxed pl-3 mb-1">{line.slice(2)}</p>;
    }
    if (line.trim() === '') return <div key={i} className="h-1" />;
    return <p key={i} className="text-sm text-slate-700 leading-relaxed">{line}</p>;
  });
}

export default function TextbookDetailClient({ book }: { book: Book }) {
  const [activeTab, setActiveTab] = useState<"intro" | "toc">("intro");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* 브레드크럼 */}
      <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-blue-600 transition-colors">홈</Link>
        <svg className="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link href="/textbooks" className="hover:text-blue-600 transition-colors">교재</Link>
        <svg className="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-slate-700 font-medium truncate">{book.title}</span>
      </nav>

      {/* ── 상단 영역: 썸네일 + 정보 + 자료 ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-4">
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-7">

          {/* 표지 이미지 + 출간정보 */}
          <div className="shrink-0 flex flex-col gap-3">
            {book.image ? (
              <img
                src={book.image}
                alt={book.title}
                className="w-[211px] h-[298px] object-cover rounded-xl shadow-lg border border-slate-100"
              />
            ) : (
              <div className="w-[211px] h-[298px] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center text-8xl shadow-lg border border-slate-100">
                {book.emoji}
              </div>
            )}
            {/* 썸네일 하단 메타 정보 */}
            <div className="w-[211px] bg-slate-50 rounded-xl border border-slate-100 px-3 py-2.5 space-y-1.5">
              {book.publishDate && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">출간</span>
                  <span className="text-slate-700 font-semibold">{book.publishDate}</span>
                </div>
              )}
              {book.pages && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">페이지</span>
                  <span className="text-slate-700 font-semibold">{book.pages}p</span>
                </div>
              )}
              {book.isbn && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">ISBN</span>
                  <span className="text-slate-600 font-mono text-[10px]">{book.isbn.slice(-7)}</span>
                </div>
              )}
              <div className="pt-1 border-t border-slate-200">
                <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-3">{book.description}</p>
              </div>
            </div>
          </div>

          {/* 우측: 도서정보 + 자료 영역 */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">

            {/* 도서 기본 정보 */}
            <div>
              <div className="flex items-start gap-2.5 mb-1.5">
                <h1 className="text-2xl font-black text-slate-800 leading-tight">{book.title}</h1>
                {book.isNew && (
                  <span className="shrink-0 mt-1 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">NEW</span>
                )}
              </div>
              <p className="text-slate-500 text-sm mb-3">{book.author}</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium">{book.levelGroup}</span>
                <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">{book.category}</span>
                <span className="text-xs bg-slate-50 text-slate-500 px-3 py-1 rounded-full">{book.publishDate} 출간</span>
                {book.pages && <span className="text-xs bg-slate-50 text-slate-500 px-3 py-1 rounded-full">{book.pages}p</span>}
                {book.isbn && <span className="text-xs bg-slate-50 text-slate-400 px-3 py-1 rounded-full font-mono">ISBN {book.isbn}</span>}
              </div>
            </div>

            {/* 자료 영역 */}
            <div className="rounded-xl border-2 border-blue-100 bg-blue-50/40 overflow-hidden flex-1">
              {/* 자료 헤더 */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#1B3A6B]">
                <p className="text-sm font-bold text-white flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  부가자료
                </p>
                {/* 모아받기 버튼 */}
                <button className="flex items-center gap-1.5 px-3 py-1 bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs font-bold rounded-lg transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  모아받기
                </button>
              </div>

              {/* 파일 목록 */}
              <ul className="divide-y divide-blue-100 px-3 py-1.5">
                {MATERIALS.map((m) => (
                  <li key={m.id} className="flex items-center gap-2 py-2">
                    <span className="text-sm shrink-0">{m.icon}</span>
                    <span className="text-xs font-semibold text-slate-700 w-20 shrink-0">{m.label}</span>
                    <span className={`text-[10px] font-bold ${m.color} bg-white px-1.5 py-0.5 rounded border ${m.border} shrink-0`}>{m.type}</span>
                    <button
                      className={`ml-auto shrink-0 flex items-center gap-1 ${m.color} bg-white border ${m.border} hover:opacity-70 transition-opacity px-2 py-1 rounded-lg text-[10px] font-bold`}
                      title="다운로드"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      받기
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* 액션 버튼 */}
            <div className="flex flex-wrap gap-2">
              {/* 마이클래스 담기 + 툴팁 */}
              <div className="relative group/tip">
                <Link
                  href={`/my-class?add=${book.id}`}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-[#1B3A6B] hover:bg-[#163060] text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  마이클래스 담기
                </Link>
                {/* 툴팁 */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-56 bg-slate-800 text-white text-[11px] rounded-xl px-3.5 py-2.5 leading-relaxed opacity-0 group-hover/tip:opacity-100 pointer-events-none transition-opacity duration-150 z-20 text-center shadow-xl whitespace-normal">
                  <p className="font-semibold mb-0.5">마이클래스에 담아두세요! 📚</p>
                  <p className="text-white/75">교재를 담고 어휘마법사·커넥팅북 등<br/>모든 서비스를 한 곳에서 이용하세요</p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-slate-800" />
                </div>
              </div>

              <Link
                href="/edutech/vocab-wizard"
                className="flex items-center gap-1.5 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                어휘출제마법사
              </Link>
              <a
                href="https://www.ybmcloud.com/connecting/content?siteType=E"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                커넥팅북 (E-Book)
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* ── 하단 탭: 도서소개 / 목차 ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* 탭 헤더 */}
        <div className="flex border-b border-slate-200">
          {(["intro", "toc"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3.5 text-sm font-semibold transition-colors relative ${
                activeTab === tab
                  ? "text-blue-700"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab === "intro" ? "도서 소개" : "목차"}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* 탭 콘텐츠 */}
        <div className="p-6">
          {activeTab === "intro" && (
            <div className="space-y-0.5">{renderDescription(book.description)}</div>
          )}

          {activeTab === "toc" && book.toc && book.toc.length > 0 && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
              {book.toc.map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 py-2 border-b border-slate-50">
                  <span className="w-5 h-5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === "toc" && (!book.toc || book.toc.length === 0) && (
            <p className="text-sm text-slate-400">목차 정보가 없습니다.</p>
          )}
        </div>
      </div>

    </div>
  );
}
